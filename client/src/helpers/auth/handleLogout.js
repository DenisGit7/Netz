import axios from 'axios'

export const handleLogout = async () => {
  try {
    const response = await axios.get('http://localhost:3500/users/logout', {
      withCredentials: true
    })
    console.log(response)
    return response
  } catch (error) {
    console.log('response')

    console.error('Login error: ', error)

    return error
  }
}
