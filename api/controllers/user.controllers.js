import {
  registerUser,
  checkEmailExists,
  getUserFromHankoId,
  updateUserFromHankoId,
  updateUserWithHabit,
} from "../services/user.services.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";

export const handleUserRegistration = async (req, res) => {
  const { name, email, avatar, hankoId } = req.body;
  const isEmailAlreadyRegistered = await checkEmailExists(email);
  if (isEmailAlreadyRegistered) {
    throw new ApiError(409, "Email already exists");
  }
  try {
    const newUser = await registerUser({ name, email, avatar, hankoId });
    return res
      .status(200)
      .json(
        new ApiResponse(200, { user: newUser }, "User registered successfully")
      );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in creating user",
    });
  }
};

export const handleGetUserFromHankoId = async (req, res) => {
  const hankoId = req.params.hankoId;
  try {
    const user = await getUserFromHankoId(hankoId);
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: {
        user: user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Error in fetching user",
    });
  }
};

export const handleUserUpdate = async (req, res) => {
  const hankoId = req.params.hankoId;
  try {
    const newUser = await updateUserFromHankoId(hankoId, req.body);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Error in updating user",
    });
  }
};

export const handleHabitCompletion = async (req, res) => {
  const habitId = req.params.habitId;
  try {
    const newUser = await updateUserWithHabit(habitId);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Error in updating user",
    });
  }
};
