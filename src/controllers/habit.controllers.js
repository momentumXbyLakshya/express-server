import {
  createHabit,
  deleteHabit,
  updateHabit,
} from "../services/habit.services.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { asyncHandler } from "../utilities/asyncHandler.js";

export const handleCreateHabit = asyncHandler(async (req, res) => {
  const newHabit = await createHabit(req.body);
  return res
    .status(201)
    .json(
      new ApiResponse(201, { habit: newHabit }, "Habit created successfully")
    );
});

export const handleDeleteHabit = asyncHandler(async (req, res) => {
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
});

export const handleUpdateHabit = asyncHandler(async (req, res) => {
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
});
