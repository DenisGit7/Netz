// Reading file from local folder and save as new file in firebase

// require("dotenv").config();
import {} from "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";

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

const uploadFile = (file) => {
  const fileBuffer = fs.readFileSync(
    "C:/Users/denis/OneDrive/Drive/Programming/Projects/AccountManagerApp/api/test.txt"
  );
  const storage = getStorage(store);
  //   const fileName = new Data().getTime() + file.name;
  const storageRef = ref(storage, "Test/test1.pdf");
  //   const storageRef = ref(storage, "upload/test.txt");
  const uploadTask = uploadBytesResumable(storageRef, fileBuffer);
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

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const downloadFile = () => {
  const storage = getStorage(store);
  const storageRef = ref(storage, "Test/test1.txt");

  // Get the download URL
  getBytes(storageRef).then((buff) => {
    console.log(buff);
  });
  getDownloadURL(storageRef)
    .then((url) => {
      // Insert url into an <img> tag to "download"
      //   console.log(url);
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/object-not-found":
          // File doesn't exist
          console.log("object not found");
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          console.log("unauthorized to download");
          break;
        case "storage/canceled":
          // User canceled the upload
          console.log("download canceled");
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          console.log("unknown download error");
          break;
      }
    });
  //   getDownloadURL(storageRef);
};

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const removeFile = () => {
  const storage = getStorage(store);
  const storageRef = ref(storage, "Test/test.txt");

  // Get the download URL
  deleteObject(storageRef).catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case "storage/object-not-found":
        // File doesn't exist
        console.log("object not found");
        break;
      case "storage/unauthorized":
        // User doesn't have permission to access the object
        console.log("unauthorized to download");
        break;
      case "storage/canceled":
        // User canceled the upload
        console.log("download canceled");
        break;

      // ...

      case "storage/unknown":
        // Unknown error occurred, inspect the server response
        console.log("unknown download error");
        break;
    }
  });
  //   getDownloadURL(storageRef);
};

app.get("/", (req, res) => {
  res.send("Account Manager App");
});
app.get("/upload", (req, res) => {
  uploadFile(
    "C:/Users/denis/OneDrive/Drive/Programming/Projects/AccountManagerApp/api/test.txt"
  );
  //   uploadFile("/test.txt");

  res.send("Upload in proccess");
});
app.get("/download", (req, res) => {
  downloadFile();
  res.send("Download in proccess");
});
app.get("/remove", (req, res) => {
  removeFile();
  res.send("delete in proccess");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
