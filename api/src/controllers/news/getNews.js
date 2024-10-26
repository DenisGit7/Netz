import { New } from '../../../src/models/New.js'

export const getNews = async (req, res) => {
  try {
    const news = await New.find()

    news.sort().reverse()

    res.status(201).json({ news })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getNew = async (req, res) => {
  const id = req?.params?.id
  if (!id) return res.status(400).json({ message: 'Id is required.' })
  try {
    const news = await New.findById(id).exec()
    if (!news) {
      return res.status(400).json({ message: 'New not found' })
    }
    res.status(201).json({ news })
  } catch (error) {
    console.log(error)
  }
}
