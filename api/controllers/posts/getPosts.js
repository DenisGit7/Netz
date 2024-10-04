import { Post } from '../../models/Post.js'

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    console.log(posts)
    // added delay here
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500))
    res.status(201).json({ posts })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
