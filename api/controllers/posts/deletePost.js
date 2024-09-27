import { Post } from "../../models/Post.js";

export const deletePost = async (req, res) => {
  const { id } = req.body;
  // console.log(req.body);
  if (!id) return res.status(400).json({ message: "Id is required." });
  const post = await Post.findById(id).exec();
  if (!post) {
    return res.status(400).json({ message: "Post not found" });
  }
  try {
    const result = await post.deleteOne();
    console.log(result);
    res.status(201).json({ message: `Post deleted` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
