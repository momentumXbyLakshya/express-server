import express from "express";
import {
  handleCreateHabit,
  handleDeleteHabit,
  handleUpdateHabit,
} from "../controllers/habit.controllers.js";

const router = express.Router();

router.post("/", handleCreateHabit);
router.delete("/:id", handleDeleteHabit);
router.put("/:id", handleUpdateHabit);

export default router;
