import express from "express";
import { createNew } from "../../controllers/news/createNew.js";
const router = express.Router();

router.post("/", createNew);

export default router;
