import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Remove from "./Remove";
// import getList from "../helpers/GetList.js";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const FileList = () => {
  const [folderPath, setFolderPath] = useState({
    customerFolder: "General",
    subFolder: "subFolder",
  });
  const [folders, setFolder] = useState([]);
  const [files, setFiles] = useState([]);
  // const [rawFolders, setRawFolder] = useState([]);
  // const [rawFiles, setRawFiles] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const handleRemove = async (filepath) => {
    // e.preventDefault();
    const data = {
      fileName: filepath,
    };
    try {
      const response = await axios.post(
        "http://localhost:3500/files/remove",
        data
      );

      console.log("File removed: ", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setTimeout(() => {
      getList();
    }, 1000);
  };

  const getList = async () => {
    console.log("getting list");
    const data = {
      customerFolder: folderPath.customerFolder,
      subFolder: folderPath.subFolder,
    };
    try {
      const response = await axios.post(
        "http://localhost:3500/files/getlist",
        data
      );

      // console.log(
      //   "List of folders and files from backend: ",
      //   response.data.result.files,
      //   response.data.result.folders
      // );
      // setRawFiles(response.data.result.files);
      // setRawFolder(response.data.result.folders);
      const foldersMap = response.data.result.folders.map((folder) => {
        return <h2>{folder}</h2>;
      });
      const filesMap = response.data.result.files.map((file) => {
        return (
          <>
            <h2>{file}</h2>
            <FaTrash onClick={() => handleRemove(file)} />
          </>
        );
      });
      setFiles(filesMap);
      setFolder(foldersMap);
      console.log(files);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleGetList = (e) => {
    e.preventDefault();
    getList();
  };

  return (
    <div>
      FileList
      <button type="submit" onClick={handleGetList}>
        Get list
      </button>
      <h1>Files:</h1>
      {files}
      <h1>Folders:</h1>
      {folders}
    </div>
  );
};

export default FileList;
