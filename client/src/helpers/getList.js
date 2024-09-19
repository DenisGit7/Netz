import axios from "axios";
import { FaTrash, FaFolder, FaFileInvoice } from "react-icons/fa6";
import { handleRemove } from "./handleRemove.js";
import { handleChangeFolder } from "./handleChangeFolder.js";
import { handleDownload } from "./handleDownload.js";

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
      const folderName = folder.split("/").pop();
      return (
        <div className="folder-container">
          <FaFolder
            className="icon-file"
            onClick={(e) => handleChangeFolder(e, folder, setFolderPath)}
          />
          <h4 className="file-name">{folderName}</h4>
        </div>
      );
    });
    const filesMap = response.data.result.files.map((file) => {
      const fileName = file.split("/").pop();

      return (
        <>
          <div className="file-container">
            <FaFileInvoice
              className="icon-file"
              onClick={(e) =>
                handleDownload(customerFolder, subFolder, fileName)
              }
            />
            <h4 className="file-name">{fileName}</h4>
            <FaTrash
              className="icon-remove"
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
          </div>
        </>
      );
    });
    setFiles(filesMap);
    setFolder(foldersMap);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
