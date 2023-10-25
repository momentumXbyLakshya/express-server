import { User } from "../models/User.js";

export const registerUser = async (user) => {
  const newRegisterUser = new User({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  });
  try {
    await newRegisterUser.save();
    return newRegisterUser;
  } catch (e) {
    throw Error("Errow while creating new user");
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
