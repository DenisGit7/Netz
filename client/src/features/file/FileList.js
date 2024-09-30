import { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { getList } from '../../helpers/files/getList.js'
import classes from './FileList.module.css'

//TODO: Implement setLoading use

const FileList = ({
  setLoading,
  files,
  setFiles,
  folders,
  setFolders,
  folderPath,
  setFolderPath,
  role
}) => {
  const [downloadURL, setDownloadURL] = useState('')

  useEffect(() => {
    getList(
      setFiles,
      setFolders,
      folderPath.customerFolder,
      folderPath.subFolder,
      setFolderPath
    )
  }, [folderPath])

  const handleChangeAdminBack = (e) => {
    e.preventDefault()
    setFolderPath({
      customerFolder: '',
      subFolder: ''
    })
  }
  return (
    <>
      <div>
        {folders}
        {files}
      </div>
      {role === 'Admin' && (
        <div className={classes.arrowContainer}>
          <FaArrowLeft onClick={(e) => handleChangeAdminBack(e)} />
          Back to Root
        </div>
      )}
    </>
  )
}

export default FileList
