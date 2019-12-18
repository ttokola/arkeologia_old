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

const getAllPostsForProject = async (projectName) => {
  const response = await axios.get(`${baseUrl}/${projectName}/fullPosts`)
  console.log("get all posts")
  return response.data
}

const getPostById = async (project, id) => {
  //TODO get full post with story and details with project and id

}

const createNewPost = async (postObject, projectName) => {
  const config = {
    headers: {"Authorization": token}
  }
  const response = await axios.post(`${baseUrl}/${projectName}/fullPosts`, postObject, config)
  return response
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

const deletePost = async (id) => {

  const config = {
    headers: {"Authorization": token}
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response

}

export default {getAllPosts, createNew, deletePost, setToken}