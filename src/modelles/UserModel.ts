import {Schema, model} from "mongoose";

const UserModel = new Schema({
  userName: {type: String, unique: true, require: true},
  password: {type: String, require: true},
  roles: {type: String, ref: 'Role'},
})

export const userModel =  model('UserModel', UserModel)
