import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      index: {unique: true}
    },
    email: {
      type: String,
      required: true,
      index: {unique: true}
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model('User', noteSchema);
