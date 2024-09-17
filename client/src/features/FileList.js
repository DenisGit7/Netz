import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { getList } from "../helpers/getList.js";

const FileList = () => {
  const [folderPath, setFolderPath] = useState({
    customerFolder: "Denis",
    subFolder: "Aug",
  });
  const [uploadPath, setUploadPath] = useState({
    customerFolder: "Denis",
    subFolder: "Dec",
  });
  const [folders, setFolder] = useState([]);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState([]);

  useEffect(() => {
    getList(
      setFiles,
      setFolder,
      folderPath.customerFolder,
      folderPath.subFolder,
      setFolderPath
    );
  }, [folderPath]);

  const handleChangeBack = (e) => {
    e.preventDefault();
    setFolderPath({
      customerFolder: folderPath.customerFolder || "General",
      subFolder: "",
    });
  };

  const handleChangeAdminBack = (e) => {
    e.preventDefault();
    setFolderPath({
      customerFolder: "",
      subFolder: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("customerFolder", uploadPath.customerFolder);
    formData.append("subFolder", uploadPath.subFolder);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3500/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setTimeout(() => {
      getList(
        setFiles,
        setFolder,
        folderPath.customerFolder,
        folderPath.subFolder
      );
    }, 1000);
    setFile([]);
  };

  return (
    <div>
      <h1 className="files-header">{folderPath.customerFolder}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <button type="submit">Upload</button>
          <label className="file-upload-label">
            Choose file
            <input
              type="file"
              id="file"
              onChange={(e) => setFile((prev) => e.target.files[0])}
            />
          </label>
          <h4 className="file-upload-name">
            {!file.name ? "Waiting for file" : file.name}
          </h4>
        </div>
      </form>
      <div>
        {folderPath.subFolder === "" ? (
          ""
        ) : (
          <FaArrowLeft
            className="icon-back"
            onClick={(e) => handleChangeBack(e)}
          />
        )}
      </div>
      {/* {folders == "" ? (
        ""
      ) : (
        <h1 className="files-header">{`${folderPath.customerFolder}`}</h1>
      )} */}
      {folders}
      <h1 className="files-header">{`${folderPath.subFolder}`}</h1>
      {files}
      <div>
        Admin Back
        <FaArrowLeft onClick={(e) => handleChangeAdminBack(e)} />
      </div>
    </div>
  );
};

export default FileList;
