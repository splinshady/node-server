import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {gravatar} from "../util/gravatar"
import {AuthenticationError} from "apollo-server-express";

export const Mutation = {
  newNote: async (parent: any, args: any, {models}: any) => {
    return await models.Note.create({
      content: args.content,
      author: "You"
    })
  },
  deleteNote: async (parent: any, {id}: any, {models}: any) => {
    try {
      await models.Note.findByIdAndRemove({_id: id})
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  },
  updateNote: async (parent: any, {content, id}: any, {models}: any) => {
    try {
      return await models.Note.findByIdAndUpdate(
        {_id: id},
        {$set: {content: content}},
        {new: true}
      )
    } catch (e) {
      console.error(e)
    }
  },
  signUp: async (parent: any, {userName, email, password}: any, {models}: any) => {
    email = email.trim().toLowerCase()
    const hashed = await bcrypt.hash(password, 10)
    const avatarImg = gravatar(email)
    try {
      const user = await models.User.create({
        userName,
        email,
        password: hashed,
        avatar: avatarImg
      })
      return jwt.sign({id: user._id}, process.env.JWT_SECRET as string)
    } catch (e) {
      console.error(e)
      throw new Error("Creating account error")
    }
  },
  signIn: async (parent: any, {userName, email, password}: any, {models}: any) => {
    if (email) {
      email = email.trim().toLowerCase()
    }

    const user = await models.User.findOne({
      $or: [{email}, {userName}]
    })

    if (!user) {
      throw new AuthenticationError("User not found")
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      throw new AuthenticationError("Sign in error")
    }
    return jwt.sign({id: user._id}, process.env.JWT_SECRET as string)
  },
}
