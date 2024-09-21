import React from 'react'
import axios from 'axios'
import classes from './FileUpload.module.css'
import { getList } from '../helpers/getList.js'

const FileUpload = ({
  file,
  setFile,
  uploadPath,
  setFiles,
  setFolders,
  folderPath
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('1', file)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('customerFolder', uploadPath.customerFolder)
    formData.append('subFolder', uploadPath.subFolder)
    console.log('2', formData)
    try {
      const response = await axios.post(
        'http://localhost:3500/files/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log('4', response.data)
    } catch (error) {
      console.error('Error uploading file:', error)
      console.log('5')
    }
    setTimeout(() => {
      getList(
        setFiles,
        setFolders,
        folderPath.customerFolder,
        folderPath.subFolder
      )
      console.log('6')
    }, 1000)
    setFile([])
  }

  return (
    <div className={classes.container}>
      <p className={classes.text}>
        Choose a file from your computer, then click 'Upload'
      </p>
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
            {!file.name ? 'Waiting for file' : file.name}
          </h4>
        </div>
      </form>
    </div>
  )
}

export default FileUpload
