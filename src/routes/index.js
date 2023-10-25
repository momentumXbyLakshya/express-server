import express from "express";
import userRouter from "./user.routes.js";
import habitRouter from "./habit.routes.js";
import todoRouter from "./todo.routes.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/habit", habitRouter);
router.use("/todo", todoRouter);

export default router;
