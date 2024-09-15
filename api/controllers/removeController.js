import store from "../firebase.config.js";
import { fileDestinationRemove } from "../helpers/fileDestinationRemove.js";
import path from "path";
import { deleteObject, listAll, getStorage, ref } from "firebase/storage";

export const removeController = (customerFolder, subFolder, fileName) => {
  const fullPath = fileDestinationRemove(customerFolder, subFolder, fileName);
  const storage = getStorage(store);
  const storageRef = ref(storage, fullPath);
  console.log(fullPath);
  // Delete the file
  deleteObject(storageRef)
    .then(() => {
      // File deleted successfully
      console.log(`File in path: ${fullPath} deleted`);
    })
    .catch((error) => {
      // console.log(error);
      console.log(error.code);
      // Uh-oh, an error occurred!
    });

  return `${path.parse(fileName).name} Removed successfully`;
};
