// By: Niklas Impiö
import axios from "axios"
//when running sepatate frontend
//const baseUrl = "http://localhost:3001/api/account/"
const baseUrl = "/api/account/"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getUserSettings = async () => {
  /*
  Returns token owners account info
  */
  const config = {
    headers: {"Authorization": token}
  }
  const response = axios.get(baseUrl, config)
  return response
}

const editUserSettings = async (userConfig) => {
  /*
  Used of editing user settings like changing password, username etc.
  */
  const config = {
    headers: {"Authorization": token}
  }
  const response = axios.put(baseUrl, userConfig, config)
  return response
}


const deleteAccount = async () => {
  /*
  Permanently deletes the account.
  */
  const config = {
    headers: {"Authorization": token}
  }
  const response = axios.delete(baseUrl, config)
  return response
}

export default {getUserSettings, editUserSettings, deleteAccount, setToken}