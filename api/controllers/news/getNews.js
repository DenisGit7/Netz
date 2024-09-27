import { New } from "../../models/New.js";

export const getNews = async (req, res) => {
  try {
    const news = await New.find();
    console.log(news);
    res.status(201).json({ news, message: `News list update` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
