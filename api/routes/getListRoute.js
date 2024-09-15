import express from "express";
import { getListController } from "../controllers/getListController.js";

const router = express.Router();

router.post("/", (req, res) => {
  try {
    if (!req.body.customerFolder || !req.body.subFolder) {
      res.json("Data error");
    } else {
      async function fetchList() {
        try {
          const result = await getListController(
            req.body.customerFolder,
            req.body.subFolder
          );
          console.log("Folders:", result.folders);
          console.log("Files:", result.files);
          // return result.folders;
          res.json({
            message: "Files list fetched successfully",
            result: { folders: result.folders, files: result.files },
          });
        } catch (error) {
          console.error("Failed to list files and folders:", error);
        }
      }
      fetchList();
    }
  } catch (err) {
    console.log(err);
    res.json("File error");
  }
});

export default router;
