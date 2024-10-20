import axios from 'axios'
import toast from 'react-hot-toast'
import classes from './FileUpload.module.css'
import { getList } from '../../helpers/files/getList.js'
import { Form, Link, redirect } from 'react-router-dom'

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
      <Form method="post" className={classes.formContainer}>
        <p>
          <label htmlFor="file" className={classes.newButton}>
            Choose file
            <input type="file" name="file" id="file" required />
          </label>
        </p>
        <p>
          <h4 className={classes.label}>
            {!file.name ? 'Waiting for file' : file.name}
          </h4>
        </p>
        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button>Upload</button>
        </p>
      </Form>
    </div>
  )
}

export default FileUpload

export const action = async ({ request }) => {
  const formData = await request.formData()

  const fileData = Object.fromEntries(formData)
  try {
    await axios.post('http://localhost:3500/files/upload', {
      file: fileData.file
    })
  } catch (error) {
    // console.error("Register error: ", error);
    return error
  }

  return redirect('/files')
}
