import { registerUser, checkEmailExists } from "../services/user.services.js";

export const handleUserRegistration = async (req, res) => {
  const { name, email, avatar } = req.body;
  console.log("here", email);
  const isEmailAlreadyRegistered = await checkEmailExists(email);
  if (isEmailAlreadyRegistered) {
    res.status(400).json({
      success: false,
      message: "Email already exists!",
    });
    return;
  }
  try {
    const newUser = await registerUser({ name, email, avatar });
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({
      success: false,
      message: "Error in creating user",
    });
  }
};
