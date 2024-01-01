import { InterfaceHabit } from "../models/habit.model";
import {
  createHabit,
  deleteHabit,
  updateHabit,
} from "../services/habit.services";
import { ApiResponse } from "../utilities/ApiResponse";
import { asyncHandler } from "../utilities/asyncHandler";
import { Request, Response } from "express";

export const handleCreateHabit = asyncHandler(
  async (req: Request, res: Response) => {
    const newHabit = await createHabit(req.body);
    return res
      .status(201)
      .json(
        new ApiResponse<{ habit: InterfaceHabit }>(
          201,
          { habit: newHabit },
          "Habit created successfully"
        )
      );
  }
);

export const handleDeleteHabit = asyncHandler(
  async (req: Request, res: Response) => {
    const deletedHabit = await deleteHabit(req.params.id);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { habit: deletedHabit },
          "Habit deleted successfully"
        )
      );
  }
);

export const handleUpdateHabit = asyncHandler(
  async (req: Request, res: Response) => {
    const habitId = req.params.id;
    const updatedHabit = await updateHabit(habitId, req.body);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { habit: updatedHabit },
          "Habit updated successfully"
        )
      );
  }
);
