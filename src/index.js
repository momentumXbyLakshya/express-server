import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
import { isAuthenticated } from "./middleware/auth.js";

import "./db.setup.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(isAuthenticated);

app.use("/api", router);

app.listen(PORT, (err) => {
  console.log(`Server running on port ${PORT}`);
});
