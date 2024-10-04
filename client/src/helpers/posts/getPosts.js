import axios from 'axios'

export const getPosts = async () => {
  try {
    const response = await axios.get('http://localhost:3500/posts/get')
    console.log('11')
    console.log(response)
    console.log('11')
    //removed await from line 10
    const result = response.data.posts
    return result
  } catch (error) {
    console.error(' error: ', error)
    return error
  }
}
