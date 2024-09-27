import express from "express";
import { removeController } from "../../controllers/files/removeController.js";

const router = express.Router();

router.post("/", (req, res) => {
  try {
    if (!req.body.fileName) {
      res.json("Data error");
    } else {
      removeController(req.body.fileName);
      res.json({ message: "File removed successfully" });
    }
  } catch (err) {
    console.log(err);
    res.json("File error");
  }
});

export default router;
