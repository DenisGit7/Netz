import express from "express";
import { getPost, getPosts } from "../../controllers/posts/getPosts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);

export default router;
