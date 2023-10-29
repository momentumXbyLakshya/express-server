import { User } from "../models/User.js";
import { Habit } from "../models/Habit.js";

export const createHabit = async (habit) => {
  const newCreatedHabit = new Habit({
    title: habit.title,
    user: habit.user,
    type: habit.type,
    difficulty: habit.difficulty,
    positiveCounter: habit?.positiveCounter || 0,
    negativeCounter: habit?.negativeCounter || 0,
    resetCounterType: habit.resetCounterType,
  });

  try {
    await newCreatedHabit.save();
    const userOfHabit = await User.findById(habit.user);
    const newUserHabits = [...userOfHabit.habits, newCreatedHabit._id];
    userOfHabit.habits = newUserHabits;
    await userOfHabit.save();
    return newCreatedHabit;
  } catch (err) {
    throw Error("Error in creating habit");
  }
};

export const deleteHabit = async (habitId) => {
  try {
    const deletedHabit = await Habit.findByIdAndDelete(habitId);
    const userOfHabit = await User.findById(deletedHabit.user.toString());
    userOfHabit.habits = userOfHabit.habits.filter((hab) => {
      return hab._id.toString() !== habitId;
    });
    await userOfHabit.save();
    return deletedHabit;
  } catch (err) {
    console.log(err);
    throw Error("Error in deleting habit");
  }
};

export const updateHabit = async (habitId, habit) => {
  try {
    const habitToUpdate = await Habit.findById(habitId);
    habitToUpdate.title = habit.title;
    habitToUpdate.resetCounterType = habit.resetCounterType;
    habitToUpdate.type = habit.type;
    habitToUpdate.difficulty = habit.difficulty;
    await habitToUpdate.save();
    return habitToUpdate;
  } catch (err) {
    console.log(err);
    throw new Error("Error in updating Habit");
  }
};
