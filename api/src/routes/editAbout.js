import express from "express";
import { editAbout } from "../controllers/editAbout.js";
const router = express.Router();

router.patch("/", editAbout);

export default router;
