import express from "express";
import {
  addComment,
  deleteComment,
  getCommentsByBlog,
} from "../controller/comment.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyUser, addComment);
router.get("/:blogId", getCommentsByBlog);
router.delete("/:id", verifyUser, deleteComment);

export default router;
