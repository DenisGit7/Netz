import { New } from '../../../src/models/New.js'

export const editNew = async (req, res) => {
  const id = req?.params?.id

  const { newTitle, newContent } = req?.body

  if (!newTitle || !newContent)
    return res.status(400).json({ message: 'All fields are required.' })
  try {
    const result = await New.findByIdAndUpdate(id, {
      title: newTitle,
      content: newContent
    })

    res.status(201).json({ message: 'New updated' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
