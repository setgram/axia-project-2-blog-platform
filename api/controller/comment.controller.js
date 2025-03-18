import Blog from "../model/blog.model.js";
import Comment from "../model/comment.model.js";

export const addComment = async (req, res) => {
  try {
    const { content, blogId } = req.body;
    const newComment = new Comment({
      content,
      author: req.user.id,
      blog: blogId,
    });
    await newComment.save();

    await Blog.findByIdAndUpdate(blogId, {
      $push: { comments: newComment._id },
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCommentsByBlog = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId }).populate(
      "author",
      "name"
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
