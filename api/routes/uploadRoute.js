import express from "express";
import { uploadController } from "../controllers/uploadConroller.js";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  try {
    if (!req.body.customerFolder || !req.body.subFolder || !req.file) {
      res.json("Data error");
    } else {
      const result = uploadController(
        req.body.customerFolder,
        req.body.subFolder,
        req.file
      );
      console.log(result);
      res.json({ message: "File uploaded successfully", file: req.file });
    }
  } catch (err) {
    console.log(err);
    res.json("File error");
  }
});

export default router;
