import {Schema, model} from "mongoose";

const RoleModel = new Schema({
  value: {type: String, unique: true, defaultValue: 'USER'},
})

export const userModel =  model('RoleModel', RoleModel)
