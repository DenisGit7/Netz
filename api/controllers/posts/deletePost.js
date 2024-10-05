import { Post } from '../../models/Post.js'

export const deletePost = async (req, res) => {
  const id = req?.params?.id
  console.log(55555, req.params, id)
  if (!id) return res.status(400).json({ message: 'Id is required.' })
  const post = await Post.findOne({ _id: id })
  console.log(666666, post)

  if (!post) {
    return res.status(400).json({ message: 'Post not found' })
  }
  try {
    console.log(77777, post)
    const result = await post.deleteOne()
    console.log(88888, result)
    res.status(201).json({ message: `Post deleted` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
