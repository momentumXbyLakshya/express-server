import { Schema, model } from "mongoose";

const HabitSchema = new Schema(
  {
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: Number,
    difficulty: Number,
    positiveCounter: Number,
    negativeCounter: Number,
    resetCounterType: Number,
  },
  {
    timestamps: true,
  }
);

export const Habit = model("Habit", HabitSchema);
