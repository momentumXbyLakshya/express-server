import {
  createHabit,
  deleteHabit,
  updateHabit,
} from "../services/habit.services.js";

// TODO: Error testing on endpoints
export const handleCreateHabit = async (req, res) => {
  try {
    const newHabit = await createHabit(req.body);
    res.status(200).json({
      success: true,
      message: "Habit created successfully",
      data: {
        habit: newHabit,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in creating Habit",
    });
  }
};

export const handleDeleteHabit = async (req, res) => {
  try {
    const deletedHabit = await deleteHabit(req.params.id);
    res.status(200).json({
      success: true,
      message: "Habit deleted successfully",
      data: {
        habit: deletedHabit,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in deleting Habit",
    });
  }
};

export const handleUpdateHabit = async (req, res) => {
  const habitId = req.params.id;
  try {
    const updatedHabit = await updateHabit(habitId, req.body);
    res.status(200).json({
      sucesss: true,
      message: "Habit updated successfully",
      data: {
        habit: updatedHabit,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in updating habit",
    });
  }
};
