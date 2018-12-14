import axios from 'axios'
const baseUrl = '/api/blogs'

let config

const setToken = (newToken) => {
  config = {
    headers: {
      Authorization: `Bearer ${newToken}`
    }
  }
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, config)
  return response.data

}
const update = async (blog) => {
  const url = `${baseUrl}/${blog.id}`
  const response = await axios.put(url, blog, config)
  return response.data

}
const remove = async (blog) => {
  const url = `${baseUrl}/${blog.id}`
  const response = await axios.delete(url, config)
  return response.status
}

export default { getAll, create, update, setToken, remove }