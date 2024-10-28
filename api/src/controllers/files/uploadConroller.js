import store from "../../firebase.config.js";
import path from "path";
import { fileDestination } from "../../../src/helpers/fileDestenation.js";
import {
  deleteObject,
  getBytes,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export const uploadController = (customerFolder, subFolder, file) => {
  const fullPath = fileDestination(
    customerFolder,
    subFolder,
    file.originalname
  );

  const storage = getStorage(store);
  const storageRef = ref(storage, fullPath);
  const uploadTask = uploadBytesResumable(storageRef, file.buffer);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
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
      switch (error.code) {
        case "storage/unauthorized":
          console.log("unauthorized to upload");
          break;
        case "storage/canceled":
          console.log("canceled to upload");
          break;

        case "storage/unknown":
          console.log("unknown upload error");

          break;
      }
    }
  );
  return `${path.parse(file.originalname).name} Uploaded successfully`;
};
