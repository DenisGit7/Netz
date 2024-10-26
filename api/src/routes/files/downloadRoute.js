import express from "express";
import { downloadController } from "../../controllers/files/downloadController.js";
const router = express.Router();

router.post("/", (req, res) => {
  try {
    if (req.body.filePath == null) {
      res.json("Data error");
    } else {
      console.log(req.body.filePath);
      async function downloadFile() {
        try {
          const downloadURL = await downloadController(req.body.filePath);
          console.log("---------------------");
          console.log(req.body.filePath);
          console.log(downloadURL);
          res.json({
            message: "Files downloaded successfully",
            url: downloadURL,
          });
        } catch (error) {
          console.error("Failed to download file", error);
        }
      }
      downloadFile();
    }
  } catch (err) {
    console.log(err);
    res.json("File error");
  }
});

export default router;
