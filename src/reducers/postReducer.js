import postService from "../services/posts"

const postReducer = (state = [], action) => {
  switch(action.type){
  case "GET_ALL":
    return state
  case "INIT":
    return action.data
  default:
    return state
  }
}

export const initPosts = () => {
  console.log("initing posts")
  return async dispatch => {
    const posts = await postService.getAllPosts()
    dispatch({
      type: "INIT",
      data: posts
    })
  }
}

export const getAllPosts = () => {
  console.log("getting posts")
  return dispatch => {
    dispatch({
      type: "GET_ALL"
    })
  }
}

export const createPost = (object) => {
  // {author, title, story, image, location}
  return async dispatch => {
    const newPost = postService.createNew(object)
    dispatch({
      type: "CREATE_POST",
      data: newPost
    })
  }
}

export default postReducer