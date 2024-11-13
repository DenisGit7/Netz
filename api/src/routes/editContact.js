import express from "express";
import { editContact } from "../controllers/editContact.js";
const router = express.Router();

router.patch("/", editContact);

export default router;
