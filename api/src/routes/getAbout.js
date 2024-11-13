import express from "express";
import { getAbout } from "../controllers/getAbout.js";
const router = express.Router();

router.get("/", getAbout);

export default router;
