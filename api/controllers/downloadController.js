import store from "../firebase.config.js";
import { listAll, getStorage, ref, getDownloadURL } from "firebase/storage";

export const downloadController = async (filePath) => {
  // console.log(filePath);
  const storage = getStorage();
  const fileRef = ref(storage, filePath);

  await getDownloadURL(fileRef);
  // console.log(res, "result");

  return getDownloadURL(fileRef);
  // console.log(downloadURL);
};
