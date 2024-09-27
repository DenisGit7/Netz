import { New } from "../../models/New.js";

export const createNew = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: "All fields are required." });
  try {
    const result = await New.create({
      title: title,
      content: content,
    });
    console.log(result);
    res.status(201).json({ message: `New ${title} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
