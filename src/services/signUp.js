// By: Niklas Impiö
import axios from "axios"
//when running sepatate frontend
const baseUrl = "http://localhost:3001/sign-up/"
//const baseUrl = "/api/sign-up"

const signUp = async (object) => {
  const response = await axios.post(baseUrl, object)
  //depends what happens at sign up, does it auto login???
  return response.code
}

const checkUsernameAvailability = async (username) => {
  //TODO ??
}
//how do we want to handle usernames? #XXXX endings??? dynamic availability??? trial and error???


export default {signUp}