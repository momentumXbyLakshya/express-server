import express from "express";
import { handleUserRegistration } from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/", handleUserRegistration);

export default router;
