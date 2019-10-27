// By: Niklas Impiö
import postService from "../services/posts"

const postReducer = (state = [], action) => {
  switch(action.type){
  case "GET_ALL_POSTS":
    return state
  case "INIT_POSTS":
    return action.data
  case "CREATE_POST":
    return state.concat(action.data)
  default:
    return state
  }
}

export const initPosts = () => {
  console.log("initing posts")
  return async dispatch => {
    const posts = await postService.getAllPosts()
    dispatch({
      type: "INIT_POSTS",
      data: posts
    })
  }
}
/*
export const getAllPosts = () => {
  console.log("getting posts")
  return dispatch => {
    dispatch({
      type: "GET_ALL"
    })
  }
}
*/
export const createPost = (object) => {
  // {author, title, story, image, location}
  console.log(object)
  return async dispatch => {
    const newPost = postService.createNew(object)
    dispatch({
      type: "CREATE_POST",
      //might need to change this later, depending how the api works, currently the json-server doesn't return shit after posting, thats why redux isn't updating.
      data: object
    })
  }
}

export default postReducer