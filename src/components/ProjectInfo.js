import React, {useEffect, useState} from "react"
import {connect} from "react-redux"

import {getProjectInfo} from "../services/projects"
import {setActiveProjectInfo} from "../reducers/projectReducer"

import {notify} from "../reducers/notificationReducer"

import "../styles/projectInfo.css"

export const ProjectInfo = (props) => {
  /*
  Some initial stuff for project info component
  */

  const [info, setInfo] = useState(null)
  useEffect( async () => {
    if(props.state.projects.activeInfo === null){
      //if active project info is null, update it.
      try{
        props.setActiveProjectInfo(await getProjectInfo(props.projects.active).data)
        setInfo(props.projects.activeInfo)
      }catch(error){
        props.notify("Couldn't get project info", true, 5)
      }
    }
  })

  const closeClick = (event) => {
    //go back to the previous page
    event.preventDefault()
    console.log("closebutton clicked")
    props.history.goBack()
  }


  if(info){
    return(
      <div className="projectInfoContainer">
        <div className="titleContainer">
          <h1 className="titleText">{info.title}</h1>
        </div>


      </div>
    )
  }else{
    return(
      <div className="projectInfoContainer">
        <div className="titleContainer">
          <h1 className="titleText">{props.settings.strings["project_info"]}</h1>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    projects: state.projects,
    settings: state.settings
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  notify,
  setActiveProjectInfo

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectInfo)