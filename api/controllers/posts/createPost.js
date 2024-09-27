import { Post } from "../../models/Post.js";

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: "All fields are required." });
  try {
    const result = await Post.create({
      title: title,
      content: content,
    });
    console.log(result);
    res.status(201).json({ message: `Post ${title} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
