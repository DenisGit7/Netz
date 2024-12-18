import axios from "axios";
import { getList } from "./getList.js";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../service/api";

export const handleRemove = async (file) => {
  const data = {
    fileName: file,
  };
  try {
    const response = await axios.post(`${apiUrl}/files/remove`, data);
    console.log("File removed: ", response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
  // setTimeout(() => {
  //   getList(setFiles, setFolder, customerFolder, subFolder, setFolderPath);
  // }, 1000);
};
