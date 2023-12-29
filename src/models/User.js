import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: String,
    hankoId: String,
    email: String,
    avatar: String,
    health: { type: Number, default: 100 },
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    habits: {
      type: [{ type: Schema.Types.ObjectId, ref: "Habit" }],
      default: [],
    },
    todos: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
