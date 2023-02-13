import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      ref: 'User',
      required: true
    },
    favoriteCount: {
      type: Number,
      default: 0
    },
    favoriteBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
);

export const Note = mongoose.model('Note', noteSchema);
