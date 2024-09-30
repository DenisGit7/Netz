import axios from 'axios'
import toast from 'react-hot-toast'
import classes from './FileUpload.module.css'
import { getList } from '../../helpers/files/getList.js'

const FileUpload = ({
  setLoading,
  file,
  setFile,
  uploadPath,
  setFiles,
  setFolders,
  folderPath
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('customerFolder', uploadPath.customerFolder)
    formData.append('subFolder', uploadPath.subFolder)
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

      console.log(response)
      toast.success('File uploaded successfuly')
    } catch (error) {
      toast.error(error)
    }
    setLoading(false)
    setTimeout(() => {
      getList(
        setFiles,
        setFolders,
        folderPath.customerFolder,
        folderPath.subFolder
      )
    }, 1000)
    setFile([])
  }

  return (
    <div className={classes.container}>
      <p className={classes.text}>
        Choose a file from your computer, then click 'Upload'
      </p>
      <form className={classes.formContainer} onSubmit={handleSubmit}>
        <div>
          <label className={classes.newButton}>
            Choose file
            <input
              type="file"
              id="file"
              onChange={(e) => setFile((prev) => e.target.files[0])}
            />
          </label>
          <h4 className={classes.label}>
            {!file.name ? 'Waiting for file' : file.name}
          </h4>
          <button className={classes.newButton} type="submit">
            Upload
          </button>
        </div>
      </form>
    </div>
  )
}

export default FileUpload
