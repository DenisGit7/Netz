import React from "react";
import classes from "./FolderTree.module.css";
import FileList from "../features/FileList";
import BackArrow from "./BackArrow";

//TODO: This component is currently in the way between Main and the feature FileList, currently acting as container of all information, leaving only display to FileList

const FolderTree = ({
  files,
  setFiles,
  folders,
  setFolders,
  folderPath,
  setFolderPath,
}) => {
  return (
    <div className={classes.container}>
      <p className={classes.text}>Your files get organised here by Month</p>
      <div className={classes.navigation}>
        <p className={classes.navText}>
          Current Folder :
          {folderPath.customerFolder ? (
            <span className={classes.span}> {folderPath.customerFolder}</span>
          ) : (
            " Root"
          )}
          {folderPath.subFolder && (
            <span className={classes.span}> / {folderPath.subFolder}</span>
          )}
        </p>
        {folderPath.subFolder && (
          <BackArrow folderPath={folderPath} setFolderPath={setFolderPath} />
        )}
      </div>

      <FileList
        files={files}
        setFiles={setFiles}
        folders={folders}
        setFolders={setFolders}
        folderPath={folderPath}
        setFolderPath={setFolderPath}
      />
    </div>
  );
};

export default FolderTree;
