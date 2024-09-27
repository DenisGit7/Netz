import express from "express";
import { editNew } from "../../controllers/news/editNew.js";
const router = express.Router();

router.patch("/", editNew);

export default router;
