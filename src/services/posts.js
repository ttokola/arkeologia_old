// By: Niklas Impiö
import axios from "axios"
//when running sepatate frontend
const baseUrl = "http://localhost:3001/posts"
//const baseUrl = "/api/login"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}


const getAllPosts = async () => {
  const response = await axios.get(baseUrl)
  console.log("get all posts")
  return response.data
}

const createNew = async (object) => {
  // {author, title, story, image, location}
  //position = {lat: 65.0348, lng: 25.468}
  //location is tuple (lat, lng)
  const config = {
    headers: {"Authorization": token}
  }
  const response = await axios.post(baseUrl, object, config)
  return response
}

export default {getAllPosts, createNew, setToken}