// By: Niklas Impiö
import axios from "axios"
//when running sepatate frontend
const baseUrl = "http://localhost:3001/projects"
//const baseUrl = "/api/projects/"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAvailableProjects = async () => {
  /*
  return the available project names. Used for project dropdown.
  */
  const config = {
    headers: {"Authorization": token}
  }
  const response = await axios.get(baseUrl, config)
  console.log("get all projects")
  return response.data
}

const getProjectInfo = async (name) => {
  /*
  return a specific project information, title, description, image? (randomly selected from the project???)

  Should we preload this as soon as the user switches active projects???
  */
  const config = {
    headers: {"Authorization": token}
  }
  const response = await axios.get(baseUrl, name, config)
  return response
}



export default {setToken, getAvailableProjects, getProjectInfo}

