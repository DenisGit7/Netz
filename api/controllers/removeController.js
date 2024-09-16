import store from "../firebase.config.js";
import { deleteObject, getStorage, ref } from "firebase/storage";

export const removeController = (fileName) => {
  const storage = getStorage(store);
  const storageRef = ref(storage, `${fileName}`);

  deleteObject(storageRef)
    .then(() => {
      console.log(`File in path: ${fileName} deleted`);
    })
    .catch((error) => {
      console.log(error.code);
    });
};
