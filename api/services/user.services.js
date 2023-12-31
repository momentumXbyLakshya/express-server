import { User } from "../models/User.js";
import { Habit } from "../models/Habit.js";
import { ApiError } from "../utilities/ApiError.js";

export const registerUser = async (user) => {
  const newRegisterUser = await User.create(user);
  try {
    await newRegisterUser.save();
    return newRegisterUser;
  } catch (e) {
    console.log(e);
    throw new ApiError("Something went wrong while creating new user");
  }
};

export const getUserFromHankoId = async (hankoId) => {
  try {
    const user = await User.findOne({ hankoId: hankoId }).populate("habits");
    return user;
  } catch (err) {
    throw new Error("Error in finding user from Hanko ID");
  }
};

export const updateUserFromHankoId = async (hankoId, user) => {
  try {
    const toUpdateUser = await User.findOne({ hankoId }).populate("habits");
    toUpdateUser.name = user.name;
    toUpdateUser.avatar = user.avatar;

    await toUpdateUser.save();

    return toUpdateUser;
  } catch (err) {
    throw new Error("Error in finding user from Hanko ID");
  }
};

export const updateUserWithHabit = async (habitId) => {
  try {
    const habit = await Habit.findById(habitId);
    const user = await User.findById(habit.user).populate("habits");

    if (!habit || !user) {
      throw new Error("Habit or user not found");
    }

    if (habit.type === 1) {
      const prevCounter = habit.positiveCounter;
      habit.positiveCounter = prevCounter + 1;
      user.points += 5 * habit.difficulty;

      if (user.points >= 100) {
        user.level += 1;
        user.points -= 100;
        user.health = 100;
      }
    } else {
      const prevCounter = habit.negativeCounter;
      habit.negativeCounter = prevCounter - 1;

      if (user.health >= 4) {
        user.health -= 4;
      }
    }

    await habit.save();
    await user.save();

    const updatedUser = await User.findById(habit.user).populate("habits");
    return updatedUser;
  } catch (err) {
    console.log(err);
    throw new Error("Error in updating user data with Habit");
  }
};

export const checkEmailExists = async (email) => {
  try {
    const userWithSameEmail = await User.findOne({ email: email });
    if (userWithSameEmail) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new ApiError("Something went wrong while checking if email exists");
  }
};
