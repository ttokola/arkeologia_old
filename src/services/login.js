// By: Niklas Impiö
import axios from "axios"
//when running sepatate frontend
const baseUrl = "http://localhost:3001/login"
//const baseUrl = "/api/login"



const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  console.log("logging in")
  return response.data
}

export default {login}