// By: Niklas Impiö
import React from "react"

import "../styles/containers.css"



const PopUpContainer = (props) => {
  //currently blocks onsubmit events inside the container???
  //it was event.preventdefault on unfocusClick function

  const unfocusClick = (event) => {
    //event.preventDefault()
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