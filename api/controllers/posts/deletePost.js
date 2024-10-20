import { Post } from '../../models/Post.js'

export const deletePost = async (req, res) => {
  const id = req?.params?.id

  if (!id) return res.status(400).json({ message: 'Id is required.' })
  const post = await Post.findOne({ _id: id })

  if (!post) {
    return res.status(400).json({ message: 'Post not found' })
  }
  try {
    const result = await post.deleteOne()

    res.status(201).json({ message: 'Post deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
