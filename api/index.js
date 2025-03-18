import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./route/auth.route.js";
import blogRouter from "./route/blog.route.js";
import commentRouter from "./route/comment.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {
    console.log("something is wrong");
  });

const app = express();

app.use(express.json());

app.listen(4000, () => {
  console.log("server is running on port 4000");
});

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comments", commentRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
