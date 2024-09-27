import express from "express";
import { deleteNew } from "../../controllers/news/deleteNew.js";
const router = express.Router();

router.delete("/", deleteNew);

export default router;
