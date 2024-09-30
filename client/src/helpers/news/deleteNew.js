import axios from 'axios'

export const deleteNew = async (id) => {
  console.log(id)
  try {
    const response = await axios.delete('http://localhost:3500/news/delete', {
      data: {
        id: id
      }
    })
    console.log(response)
    return response
  } catch (error) {
    console.error(' error: ', error)
    return error
  }
}
