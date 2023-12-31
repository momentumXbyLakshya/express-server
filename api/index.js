import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
import { isAuthenticated } from "./middleware/auth.js";

import connectDB from "./db.setup.js";

import "./cronjobs/habit.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(cookieParser());

app.use(isAuthenticated);

app.use("/api", router);

connectDB()
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) console.log("Error in starting the server");
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch(() => {});

export default app;
