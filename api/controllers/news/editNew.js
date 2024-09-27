import { New } from "../../models/New.js";

export const editNew = async (req, res) => {
  const { id, title, content } = req.body;
  if (!id) return res.status(400).json({ message: "Id is required." });
  const oneNew = await New.findById(id).exec();
  if (!oneNew) {
    return res.status(400).json({ message: "New not found" });
  }
  title ? (oneNew.title = title) : null;
  content ? (oneNew.content = content) : null;
  try {
    const result = await oneNew.save();
    console.log(result);
    res.status(201).json({ message: `New updated` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
