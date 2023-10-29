import { User } from "../models/User.js";
import { Habit } from "../models/Habit.js";

export const registerUser = async (user) => {
  const newRegisterUser = new User(user);
  try {
    await newRegisterUser.save();
    return newRegisterUser;
  } catch (e) {
    throw Error("Errow while creating new user");
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
    const updatedUser = await User.findOneAndUpdate({ hankoId }, user).populate(
      "habits"
    );
    return updatedUser;
  } catch (err) {
    throw new Error("Error in finding user from Hanko ID");
  }
};

export const updateUserWithHabit = async (habitId) => {
  try {
    const habit = await Habit.findById(habitId);
    const user = await User.findById(habit.user).populate("habits");
    if (!habit || !user) {
      throw new Error("User or Habit not found");
    }
    if (habit.type === 1) {
      habit.positiveCounter += 1;
      user.points += 5 * habit.difficulty;
      if (user.points >= 100) {
        user.level += 1;
        user.points = user.points - 100;
        user.health = 100;
      }
    } else {
      habit.negativeCounter -= 1;
      if (user.health >= 4) {
        user.health -= 4;
      }
    }
    await habit.save();
    await user.save();
    return user;
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
    console.log(err);
    throw Error("Error in finding user with same email");
  }
};
