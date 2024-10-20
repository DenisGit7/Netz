import axios from 'axios'

export const deletePost = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3500/posts/delete/${id}`
    )
    return response
  } catch (error) {
    return error
  }
}
