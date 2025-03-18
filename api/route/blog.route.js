import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controller/blog.controller.js";

const router = express.Router();

router.post("/", verifyUser, createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", verifyUser, updateBlog);
router.delete("/:id", verifyUser, deleteBlog);

export default router;
