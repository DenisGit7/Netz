import express from 'express'
import { uploadController } from '../../controllers/files/uploadConroller.js'
import multer from 'multer'
const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/', upload.single('file'), (req, res) => {
  setTimeout(() => {
    try {
      if (
        req.body.customerFolder == null &&
        req.body.subFolder == null &&
        req.file == null
      ) {
        res.json('Data error')
      } else {
        const result = uploadController(
          req.body.customerFolder,
          req.body.subFolder,
          req.file
        )
        console.log(result)

        res.json({ message: 'File uploaded successfully', file: req.file })
      }
    } catch (err) {
      console.log(err)
      res.json('File error')
    }
  }, 2000)
})

export default router
