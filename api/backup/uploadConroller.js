import store from "../firebase.config.js";
import path from "path";
import { fileDestination } from "../helpers/fileDestenation.js";
import {
  deleteObject,
  getBytes,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export const uploadController = (customerFolder, subFolder, file) => {
  const fullPath = fileDestination(customerFolder, subFolder, file);

  const storage = getStorage(store);
  const storageRef = ref(storage, fullPath);
  const uploadTask = uploadBytesResumable(storageRef, file.buffer);
  // 3. Completion observer, called on successful completion // 2. Error observer, called on failure // 1. 'state_changed' observer, called any time the state changes // Register three observers:
  // This code is equivalent to the above.
  // uploadTask.on("state_changed", function (snapshot) {
  //   var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //   console.log(percent + "% doneeeeeeeeeee");
  // });

  // This code is equivalent to the above.
  // Just listening for progress/state changes, this is legal.

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
        case "success":
          console.log("Upload is done");
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

  return "OKOK";
};
