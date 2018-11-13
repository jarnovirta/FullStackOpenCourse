import axios from 'axios'
const baseUrl = 'http://restcountries.eu/rest/v2'

const getAll = () => {
    return axios.get(baseUrl + '/all').then(response => response.data)
}
const create = (newObject) => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}
const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}
export default { getAll, create, update}