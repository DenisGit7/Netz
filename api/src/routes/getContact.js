import express from "express";
import { getContact } from "../controllers/getContact.js";
const router = express.Router();

router.get("/", getContact);

export default router;
