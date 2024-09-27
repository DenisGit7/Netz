import { Post } from "../../models/Post.js";

export const editPost = async (req, res) => {
  const { id, title, content } = req.body;
  if (!id) return res.status(400).json({ message: "Id is required." });
  const post = await Post.findById(id).exec();
  if (!post) {
    return res.status(400).json({ message: "Post not found" });
  }
  title ? (post.title = title) : null;
  content ? (post.content = content) : null;
  try {
    const result = await post.save();
    console.log(result);
    res.status(201).json({ message: `Post updated` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
