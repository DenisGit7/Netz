import store from "../../firebase.config.js";
import { listAll, getStorage, ref, getDownloadURL } from "firebase/storage";

export const downloadController = async (filePath) => {
  const storage = getStorage();
  const fileRef = ref(storage, filePath);

  const res = await getDownloadURL(fileRef);
  return getDownloadURL(fileRef);
};
