import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    difficulty: Number,
    dueDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model("Todo", TodoSchema);
