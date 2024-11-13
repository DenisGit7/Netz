import { About } from "../models/About.js";

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    console.log(about);
    // about.sort().reverse()

    res.status(201).json({ about });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
