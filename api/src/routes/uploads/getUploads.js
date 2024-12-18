import express from "express";
import { getUploadsController } from "../../controllers/uploads/getUploadsController.js";
const router = express.Router();

router.get("/", getUploadsController);

export default router;
