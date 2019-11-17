// By: Niklas Impiö
import axios from "axios"
//when running sepatate frontend
const baseUrl = "http://localhost:3001/projectNames"
//const baseUrl = "/api/login"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAvailableProjects = async () => {
  const response = await axios.get(baseUrl)
  console.log("get all projects")
  return response.data
}

export default {setToken, getAvailableProjects}

