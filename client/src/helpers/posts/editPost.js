import axios from 'axios'

export const editPost = async (id, title, content) => {
  console.log(id, title, content)
  try {
    const response = await axios.patch(
      `http://localhost:3500/posts/edit/${id}`,
      {
        id: id,
        title: title,
        content: content
      }
    )
    console.log(response)
    return response
  } catch (error) {
    // console.error(" error: ", error);
    return error
  }
}
