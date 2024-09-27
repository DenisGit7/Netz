import express from "express";
import { editPost } from "../../controllers/posts/editPost.js";
const router = express.Router();

router.patch("/", editPost);

export default router;
