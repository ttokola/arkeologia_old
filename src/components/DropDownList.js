// By: Niklas Impiö
import React from "react"
import "../styles.css"



export const DropDownList = (props) => {
  // props should problbly have all the items and their click handlers. Like [{text: string/reference, "onClickHandler": [Function]}]

  //just a simple vertical list where all the entries are provided as props list with strings and event handlers on click.
  console.log(props.children)
  return(

    <div className="dropDownContainer">
      <ul className="dropDownList">
        {props.children}

        {props.items.map((element,index) =>
          <li key={index} className="dropDownListItem" onClick={element.onClickHandler}>
            <p className="dropDownItemText">{element.string}</p>
          </li>
        )}
      </ul>
    </div>

  )
}

export default DropDownList