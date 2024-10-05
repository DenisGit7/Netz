import { Post } from '../../models/Post.js'

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(201).json({ posts })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getPost = async (req, res) => {
  const id = req?.params?.id
  if (!id) return res.status(400).json({ message: 'Id is required.' })
  try {
    const post = await Post.findById(id).exec()
    if (!post) {
      return res.status(400).json({ message: 'Post not found' })
    }
    res.status(201).json({ post })
  } catch (error) {
    console.log(error)
  }
}
