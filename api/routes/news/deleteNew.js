import express from "express";
import { deleteNew } from "../../controllers/news/deleteNew.js";
const router = express.Router();

router.delete("/:id", deleteNew);

export default router;
