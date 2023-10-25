import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
    health: Number,
    points: Number,
    level: Number,
    habits: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    todos: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
