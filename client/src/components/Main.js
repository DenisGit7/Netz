import React, { useState, useEffect } from "react";
import FolderTree from "./FolderTree";
import FileUpload from "../features/FileUpload";

//Main app display window. Parent to upload & navigation features
//Controls all file related states and passes to both features the ones they need

const Main = ({ showUpload, showFolders, role, user }) => {
  const [folderPath, setFolderPath] = useState({
    customerFolder: "",
    subFolder: "",
  });
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [file, setFile] = useState("");
  const [uploadPath, setUploadPath] = useState({
    customerFolder: "",
    subFolder: "",
  });
  useEffect(() => {
    setUploadPath({ customerFolder: user, subFolder: "Month" });
    setFolderPath({ customerFolder: user, subFolder: "" });
  }, [user]);
  return (
    <>
      <div>
        {showUpload && (
          <FileUpload
            file={file}
            setFile={setFile}
            uploadPath={uploadPath}
            setFiles={setFiles}
            setFolders={setFolders}
            folderPath={folderPath}
          />
        )}
        {showFolders && (
          <FolderTree
            role={role}
            files={files}
            setFiles={setFiles}
            folders={folders}
            setFolders={setFolders}
            folderPath={folderPath}
            setFolderPath={setFolderPath}
          />
        )}
      </div>
    </>
  );
};

export default Main;
