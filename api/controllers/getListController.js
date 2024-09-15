import store from "../firebase.config.js";
import { listAll, getStorage, ref } from "firebase/storage";

export const getListController = async (
  customerFolder = "General",
  subFolder = ""
) => {
  const fullPath = `${customerFolder}/${subFolder}`;
  const storage = getStorage(store);
  const listRef = ref(storage, fullPath);

  try {
    const res = await listAll(listRef);
    const folderRefs = res.prefixes.map((folderRef) => folderRef.fullPath);
    const fileRefs = res.items.map((itemRef) => itemRef.fullPath);
    return {
      folders: folderRefs,
      files: fileRefs,
    };
  } catch (error) {
    console.error("Error listing files and folders:", error);
    throw error;
  }
};
