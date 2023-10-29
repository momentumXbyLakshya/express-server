import { User } from "../models/User.js";

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
