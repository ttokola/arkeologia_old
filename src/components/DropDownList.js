// By: Niklas Impiö
import React from "react"
import "../styles/dropDownList.css"



export const DropDownList = (props) => {
  // props should problbly have all the items and their click handlers. Like [{text: string/reference, "onClickHandler": [Function]}]

  return(
    <div className="dropDownContainer">
      <ul className="dropDownList">
        {props.items.map((element,index) =>
          <li key={index} className="dropDownListItem" onClick={element.onClickHandler}>
            <p className="dropDownItemText">{element.text}</p>
          </li>
        )}
      </ul>
    </div>

  )
}

export default DropDownList