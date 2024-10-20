import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { getList } from "../../helpers/files/getList.js";
import classes from "./FileList.module.css";
import { Link, useLoaderData } from "react-router-dom";
import { FaTrash, FaFolder, FaFileInvoice } from "react-icons/fa6";
import { handleDownload } from "../../helpers/files/handleDownload.js";
import { handleChangeFolder } from "../../helpers/files/handleChangeFolder.js";
import { handleRemove } from "../../helpers/files/handleRemove.js";
import { useNavigate } from "react-router-dom";

const FileList = () => {
  const navigate = useNavigate();
  const data = useLoaderData();

  useEffect(() => {}, [data]);
  const handleRemoveFunction = async (file) => {
    await handleRemove(file);
    setTimeout(() => {
      navigate("/files");
    }, 100);
  };

  const handleChangeAdminBack = (e) => {
    e.preventDefault();
  };

  const foldersMap = data.folders.map((folder, index) => {
    const folderName = folder.split("/").pop();
    return (
      <div key={index} className="folder-container">
        <FaFolder
          className="icon-file"
          onClick={(e) => handleChangeFolder(e, folder)}
        />

        <h4 className="file-name">{folderName}</h4>
      </div>
    );
  });

  const filesMap = data.files.map((file, index) => {
    const fileName = file.split("/").pop();

    return (
      <div key={index} className="file-container">
        <FaFileInvoice
          className="icon-file"
          onClick={(e) => handleDownload(file)}
        />
        <h4 className="file-name">{fileName}</h4>

        <FaTrash
          className="icon-remove"
          onClick={() => handleRemoveFunction(file)}
        />
      </div>
    );
  });
  return (
    <>
      <div>
        {foldersMap}
        {filesMap}
      </div>
      {
        <div className={classes.arrowContainer}>
          <FaArrowLeft onClick={(e) => handleChangeAdminBack(e)} />
          Back to Root
        </div>
      }
    </>
  );
};

export default FileList;
