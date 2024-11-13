import { About } from "../models/About.js";

export const editAbout = async (req, res) => {
  const { content1, content2 } = req?.body;
  console.log(req.body);
  const replacement = {
    content1: content1 ? content1 : "",
    content2: content2 ? content2 : "",
  };

  try {
    const result = await About.findOneAndUpdate({}, replacement, {
      new: true,
    });
    res.status(201).json({ message: "About info updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
