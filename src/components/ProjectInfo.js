import React from "react"
import {connect} from "react-redux"


//probably make individual css files for all you use here.

export const ProjectInfo = (props) => {
  //connected to redux state to get the current project info.
  //Don't know yet what the format is going to be but lets say that you can access it using
  // props.info.SOMETHING, that has like name, contact infomation, purpose, goal etc.
  //use placeholder strings for now.

  const closeClick = (event) => {
    //go back to the previous page
    event.preventDefault()
    console.log("closebutton clicked")
    props.history.goBack()
  }

  //html stuff here
  return(
    <div>
      <h1>PROJECT INFO</h1>
      <button onClick={closeClick}>CLOSE</button>

    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    //TODO when we have project reducer.


  }
}

export default connect(
  mapStateToProps,
  null
)(ProjectInfo)