import React from 'react'
import classes from './FolderTree.module.css'
import FileList from './FileList'
import BackArrow from '../../components/BackArrow'

//TODO: This component is currently in the way between Main and the feature FileList, currently acting as container of all information, leaving only display to FileList

const FolderTree = ({
  setLoading,
  files,
  setFiles,
  folders,
  setFolders,
  folderPath,
  setFolderPath,
  role
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
            ' Root'
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
        setLoading={setLoading}
        role={role}
        files={files}
        setFiles={setFiles}
        folders={folders}
        setFolders={setFolders}
        folderPath={folderPath}
        setFolderPath={setFolderPath}
      />
    </div>
  )
}

export default FolderTree
