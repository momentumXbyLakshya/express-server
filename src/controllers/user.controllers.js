import {
  registerUser,
  checkEmailExists,
  getUserFromHankoId,
  updateUserFromHankoId,
} from "../services/user.services.js";

export const handleUserRegistration = async (req, res) => {
  const { name, email, avatar, hankoId } = req.body;
  const isEmailAlreadyRegistered = await checkEmailExists(email);
  if (isEmailAlreadyRegistered) {
    res.status(400).json({
      success: false,
      message: "Email already exists!",
    });
    return;
  }
  try {
    const newUser = await registerUser({ name, email, avatar, hankoId });
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: newUser,
      },
    });
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
