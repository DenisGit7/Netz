import express from "express";
import { deleteUploadController } from "../../controllers/uploads/deleteUploadsController.js";
const router = express.Router();

router.delete("/:id", deleteUploadController);

export default router;
