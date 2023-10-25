import { Habit } from "../models/Habit.js";

// @ts-ignore
export const createHabit = async (habit) => {
  const newCreatedHabit = new Habit({
    title: habit.title,
    user: habit.user,
    type: habit.type,
    difficulty: habit.difficulty,
    positiveCounter: habit.positiveCounter,
    negativeCounter: habit.negativeCounter,
    resetCounterType: habit.resetCounterType,
  });
  try {
    await newCreatedHabit.save();
    return newCreatedHabit;
  } catch (err) {
    throw Error("Error in creating habit");
  }
};

export const deleteHabit = async (habitId) => {
  try {
    const deletedHabit = await Habit.findByIdAndDelete(habitId);
    return deletedHabit;
  } catch (err) {
    throw Error("Error in deleting habit");
  }
};

// @ts-ignore
export const updateHabit = async (habitId, habit) => {
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(habitId, habit);
    return updatedHabit;
  } catch (err) {
    throw new Error("Error in updating Habit");
  }
};
