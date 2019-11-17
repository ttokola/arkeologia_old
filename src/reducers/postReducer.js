// By: Niklas Impiö
import postService from "../services/posts"

const postReducer = (state = [], action) => {
  //dispatch actions defined here.
  switch(action.type){
  case "INIT_POSTS":
    return action.data
  case "CREATE_POST":
    return state.concat(action.data)
  default:
    return state
  }
}

export const initPosts = () => {
  //initializes the posts by requesting them from post service with async dispatch.
  console.log("initing posts")
  return async dispatch => {

    const posts = await postService.getAllPosts()
    dispatch({
      type: "INIT_POSTS",
      data: posts
    })
  }
}

export const createPost = (object) => {
  // {author, title, story, image, location}
  //POST request to postservice with the new post object. If succesfull updates redux state so that it contains the new object.
  console.log(object)
  return async dispatch => {
    try{
      const newPost = postService.createNew(object)
      dispatch({
        type: "CREATE_POST",
        //might need to change this later, depending how the api works, currently the json-server doesn't return shit after posting, thats why redux isn't updating.
        data: object
      })
    }catch(exeption){
      console.log(exeption)
    }

  }
}

export default postReducer