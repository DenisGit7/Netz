import axios from 'axios'

export const editNew = async (id, title, content) => {
  try {
    const response = await axios.patch('http://localhost:3500/news/edit', {
      id: id,
      title: title,
      content: content
    })
    console.log(response)
    return response
  } catch (error) {
    console.error(' error: ', error)
    return error
  }
}
