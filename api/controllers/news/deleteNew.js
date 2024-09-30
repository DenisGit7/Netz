import { New } from '../../models/New.js'

export const deleteNew = async (req, res) => {
  const { id } = req.body

  if (!id) return res.status(400).json({ message: 'Id is required.' })

  const oneNew = await New.findById(id).exec()
  if (!oneNew) return res.status(400).json({ message: 'New not found' })

  try {
    const result = await oneNew.deleteOne()
    console.log(result)
    res.status(201).json({ message: 'New deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
