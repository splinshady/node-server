import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {gravatar} from "../util/gravatar"
import {AuthenticationError, ForbiddenError} from "apollo-server-express";
import mongoose from "mongoose";

export const Mutation = {
  newNote: async (parent: any, args: any, {models, user}: any) => {
    if (!user) {
      throw new AuthenticationError("You most be signed in to create a note")
    }
    return await models.Note.create({
      content: args.content,
      author: new mongoose.Types.ObjectId(user.id)
    })
  },

  deleteNote: async (parent: any, {id}: any, {models, user}: any) => {
    if (!user) {
      throw new AuthenticationError("You most be signed in to delete a note")
    }
    const note = await models.Note.findById(id)
    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to delete the note")
    }
    try {
      await note.remove()
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  },

  updateNote: async (parent: any, {content, id}: any, {models, user}: any) => {
    if (!user) {
      throw new AuthenticationError("You most be signed in to delete a note")
    }
    const note = await models.Note.findById(id)
    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to change the note")
    }

    try {
      return await models.Note.findOneAndUpdate(
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
