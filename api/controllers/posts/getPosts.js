import { Post } from "../../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    console.log(posts);
    res.status(201).json({ posts, message: `Posts list update` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
