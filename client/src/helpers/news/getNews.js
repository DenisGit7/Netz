import axios from 'axios'

export const getNews = async () => {
  const response = await axios.get('http://localhost:3500/news/get')
  try {
    const result = await response.data.news
    console.log(result)
    return result
  } catch (error) {
    console.error(' error: ', error)
    return error
  }
}
