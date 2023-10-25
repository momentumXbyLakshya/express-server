import express from "express";

const router = express.Router();

import {
  handleCreateTodo,
  handleDeleteTodo,
  handleUpdateTodo,
} from "../controllers/todo.controllers.js";

router.post("/", handleCreateTodo);
router.delete("/:id", handleDeleteTodo);
router.put("/:id", handleUpdateTodo);

export default router;
