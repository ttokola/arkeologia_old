// By: Niklas Impiö
import projectService from "../services/projects"

const projectReducer = (state = {projects: [], active: null}, action) => {
  //dispatch actions defined here.
  switch(action.type){
  case "INIT_PROJECTS":
    console.log("initing projects")
    return {projects: action.data, active: action.data[0]}
  case "SET_ACTIVE_PROJECT":
    return {projects: state.projects, active: action.data}
  default:
    return state
  }
}

export const initProjects = () => {
  console.log("initing projects")
  return async dispatch => {

    const projects = await projectService.getAvailableProjects()
    dispatch({
      type: "INIT_PROJECTS",
      data: projects
    })
  }
}

export const setActiveProject = (projectName) => {
  return dispatch => {
    dispatch({
      type: "SET_ACTIVE_PROJECT",
      data: projectName
    })
  }
}


export default projectReducer