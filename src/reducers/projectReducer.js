// By: Niklas Impiö
import projectService from "../services/projects"

const projectReducer = (state = {projects: [], active: null, activeInfo: null}, action) => {
  //dispatch actions defined here.
  switch(action.type){
  case "INIT_PROJECTS":
    console.log("initing projects")
    return {projects: action.data, active: action.data[0], activeInfo: state.activeInfo}
  case "SET_ACTIVE_PROJECT":
    return {projects: state.projects, active: action.data, activeInfo: state.activeInfo}
  case "SET_ACTIVE_INFO":
    return {projects: state.projects, active: state.active, activeInfo: action.data}
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

export const setActiveProjectInfo = (name) => {

  return async dispatch => {
    let info = null
    try{
      info = projectService.getProjectInfo(name)
    }catch(error){
      console.log("failed to get project info")

    }
    dispatch({
      type: "SET_ACTIVE_INFO",
      data: info
    })
  }
}


export default projectReducer