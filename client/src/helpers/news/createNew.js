import axios from 'axios'

export const createNew = async (title, content) => {
  try {
    const response = await axios.post('http://localhost:3500/news/create', {
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
