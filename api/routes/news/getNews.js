import express from "express";
import { getNews } from "../../controllers/news/getNews.js";
const router = express.Router();

router.get("/", getNews);

export default router;
