// require("dotenv").config();
import {} from "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import uploadRoute from "./routes/uploadRoute.js";
import multer from "multer";

// const express = require("express");
import {
  deleteObject,
  getBytes,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import store from "./firebase.config.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Multer setup
const storage = multer.memoryStorage(); // Using memory storage for req.body
const upload = multer({ storage });

const uploadFile = (file) => {
  console.log(file.buffer);
  console.log(path.extname(file.originalname));
  // const fileBuffer = fs.readFileSync(
  //   "C:/Users/denis/OneDrive/Drive/Programming/Projects/AccountManagerApp/api/test.txt"
  // );
  // console.log(fileBuffer);
  const storage = getStorage(store);
  //   const fileName = new Data().getTime() + file.name;
  // const storageRef = ref(storage, "Test/test3.txt");
  // const storageRef = ref(storage, "Test/test13.txt");
  const storageRef = ref(storage, "upload/test123.pdf");
  // const uploadTask = uploadBytesResumable(storageRef, fileBuffer);
  const uploadTask = uploadBytesResumable(storageRef, file.buffer);
  // 3. Completion observer, called on successful completion // 2. Error observer, called on failure // 1. 'state_changed' observer, called any time the state changes // Register three observers:
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(snapshot.bytesTransferred);
      console.log(snapshot.totalBytes);
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          console.log("unauthorized to upload");
          break;
        case "storage/canceled":
          // User canceled the upload
          console.log("canceled to upload");
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          console.log("unknown upload error");
          break;
      }
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    }
  );
};

app.get("/", (req, res) => {
  res.send("Account Manager App");
});
app.use("/upload", upload.single("file"), (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  uploadFile(req.file);
  // uploadFile(req.body.file);
  // uploadFile(
  //   "C:/Users/denis/OneDrive/Drive/Programming/Projects/AccountManagerApp/api/test.txt"
  // );
  //   uploadFile("/test.txt");

  res.json({ message: "File uploaded successfully", file: req.file });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
