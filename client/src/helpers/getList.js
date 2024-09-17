import axios from "axios";
import { FaTrash } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { handleRemove } from "./handleRemove.js";
import { handleChangeFolder } from "./handleChangeFolder.js";

export const getList = async (
  setFiles,
  setFolder,
  customerFolder,
  subFolder,
  setFolderPath
) => {
  console.log("getting list");
  const data = {
    customerFolder: customerFolder,
    subFolder: subFolder,
  };
  try {
    const response = await axios.post(
      "http://localhost:3500/files/getlist",
      data
    );
    const foldersMap = response.data.result.folders.map((folder) => {
      return (
        <h2>
          {folder}
          <FaArrowLeft
            onClick={(e) => handleChangeFolder(e, folder, setFolderPath)}
          />
        </h2>
      );
    });
    const filesMap = response.data.result.files.map((file) => {
      return (
        <>
          <h2>{file}</h2>
          <FaTrash
            onClick={() =>
              handleRemove(
                file,
                setFiles,
                setFolder,
                customerFolder,
                subFolder,
                setFolderPath
              )
            }
          />
        </>
      );
    });
    setFiles(filesMap);
    setFolder(foldersMap);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
