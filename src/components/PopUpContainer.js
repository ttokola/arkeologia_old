import React from "react"

import "../styles/containers.css"



const PopUpContainer = (props) => {

  const unfocusClick = (event) => {
    event.preventDefault()
    if(event.target.id === "popUpBackground"){
      props.history.goBack()
      console.log("unfocus click")
    }
  }

  return(
    <div className="popUpContainer">
      <div id ="popUpBackground" className="popUpBackground" onClick={unfocusClick}>
        {props.children}
      </div>
    </div>
  )

}

export default PopUpContainer