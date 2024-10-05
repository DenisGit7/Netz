import { Post } from '../../models/Post.js'

export const editPost = async (req, res) => {
  const id = req?.params?.id
  console.log(-5, 'e', id)
  const { newTitle, newContent } = req?.body
  console.log(-6, 'e', newTitle, newContent)
  if (!newTitle || !newContent)
    return res.status(400).json({ message: 'All fields are required.' })
  try {
    const result = await Post.findByIdAndUpdate(id, {
      title: newTitle,
      content: newContent
    })

    res.status(201).json({ message: `Post updated` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
