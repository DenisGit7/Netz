import express from "express";
import { getNew, getNews } from "../../controllers/news/getNews.js";
const router = express.Router();

router.get("/", getNews);
router.get("/:id", getNew);

export default router;
