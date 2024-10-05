import axios from 'axios'

export const deletePost = async (id) => {
  console.log(11, id)
  try {
    const response = await axios.delete(
      `http://localhost:3500/posts/delete/${id}`
    )
    console.log(22, response)
    return response
  } catch (error) {
    // console.error(" error: ", error);
    return error
  }
}
