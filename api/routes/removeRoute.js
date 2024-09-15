import express from "express";
import { removeController } from "../controllers/removeController.js";

const router = express.Router();

router.post("/", (req, res) => {
  try {
    if (!req.body.customerFolder || !req.body.subFolder || !req.body.fileName) {
      res.json("Data error");
    } else {
      const result = removeController(
        req.body.customerFolder,
        req.body.subFolder,
        req.body.fileName
      );
      console.log(result);
      res.json({ message: "File removed successfully" });
    }
  } catch (err) {
    console.log(err);
    res.json("File error");
  }
});

export default router;
