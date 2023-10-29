import express from "express";
import {
  handleGetUserFromHankoId,
  handleUserRegistration,
  handleUserUpdate,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/", handleUserRegistration);
router.get("/:hankoId", handleGetUserFromHankoId);
router.put("/:hankoId", handleUserUpdate);

export default router;
