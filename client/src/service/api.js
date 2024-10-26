import axios from 'axios'

export default axios.create({
  baseUrl: `http://localhost:3500/api`
})
