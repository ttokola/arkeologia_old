// By: Niklas Impiö
import axios from "axios"
//when running sepatate frontend
const baseUrl = "http://localhost:3001/api/sign-up/"
//const baseUrl = "/api/sign-up"

const signUpRequest = async (object) => {
  const response = await axios.post(baseUrl, object)
  //depends what happens at sign up, does it auto login???
  return response.code
}

const checkUsernameAvailability = async (username) => {
  //TODO ??
}
//how do we want to handle usernames? #XXXX endings??? dynamic availability??? trial and error???


export default {signUpRequest}