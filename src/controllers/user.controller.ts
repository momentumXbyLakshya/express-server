import {
  registerUser,
  checkEmailExists,
  getUserFromHankoId,
  updateUserFromHankoId,
  updateUserWithHabit,
} from "../services/user.services";
import { ApiError } from "../utilities/ApiError";
import { ApiResponse } from "../utilities/ApiResponse";
import { Request, Response } from "express";
import { asyncHandler } from "../utilities/asyncHandler";
import { InterfaceUser } from "../models/user.model";

export const handleUserRegistration = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, avatar, hankoId } = req.body;
    const isEmailAlreadyRegistered = await checkEmailExists(email);
    if (isEmailAlreadyRegistered) {
      throw new ApiError(409, "Email already exists");
    }
    const newUser = await registerUser({ name, email, avatar, hankoId });
    return res
      .status(200)
      .json(
        new ApiResponse<{ user: InterfaceUser }>(
          200,
          { user: newUser },
          "User registered successfully"
        )
      );
  }
);

export const handleGetUserFromHankoId = asyncHandler(
  async (req: Request, res: Response) => {
    const hankoId = req.params.hankoId;
    const user = await getUserFromHankoId(hankoId);
    res
      .status(200)
      .json(
        new ApiResponse<{ user: InterfaceUser }>(
          200,
          { user: user as InterfaceUser },
          "User updated successfully"
        )
      );
  }
);

export const handleUserUpdate = asyncHandler(
  async (req: Request, res: Response) => {
    const newUser = await updateUserFromHankoId(req.params.hankoId, req.body);
    res.status(200).json(
      new ApiResponse<{ user: InterfaceUser }>(
        200,
        {
          user: newUser as InterfaceUser,
        },
        "User updated successfully"
      )
    );
  }
);

export const handleHabitCompletion = async (req: Request, res: Response) => {
  const newUser = await updateUserWithHabit(req.params.habitId);
  res.status(200).json(
    new ApiResponse<{ user: InterfaceUser }>(
      200,
      {
        user: newUser as InterfaceUser,
      },
      "User updated successfully"
    )
  );
};
