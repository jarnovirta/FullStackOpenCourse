import axios from 'axios'
const baseUrl = '/api/blogs'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

  try {
    return await axios.post(baseUrl, blog, config)
  }
  catch (error) {
    return Promise.reject()
  }
}

export default { getAll, create}