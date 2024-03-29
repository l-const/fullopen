import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = async () => {
  const config = {
     headers: { Authorization : token },
    }
  const response = await axios.get(baseUrl, config)
  console.log(response.data)
  return response.data
}

const create = async newObject => {
  const config = {
     headers: { Authorization : token },
    }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const modify = async newObject => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
  return response.data
}

const remove = async newObject => {
  const config = {
    headers: {
      Authorization: token,
    }
  }
    const response = await axios.delete(`${baseUrl}/${newObject.id}`, config)
    return response.data
  }



export default { getAll, setToken , create, modify, remove}