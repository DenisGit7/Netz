import { New } from '../../../src/models/New.js'

export const deleteNew = async (req, res) => {
  const id = req?.params?.id

  if (!id) return res.status(400).json({ message: 'Id is required.' })
  const oneNew = await New.findOne({ _id: id })

  if (!oneNew) {
    return res.status(400).json({ message: 'New not found' })
  }
  try {
    const result = await oneNew.deleteOne()

    res.status(201).json({ message: 'New deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
