import express from "express";
import { getPosts } from "../../controllers/posts/getPosts.js";
const router = express.Router();

router.get("/", getPosts);

export default router;
