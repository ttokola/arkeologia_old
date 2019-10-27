// By: Niklas Impiö
import React from "react"
import useComponentVisible from "../hooks/OutsideClick"

import DropDownList from "./DropDownList"
import {ReactComponent as DropDownIcon} from "../resources/arrow_drop_down-24px.svg"
import "../styles/dropDownSelect.css"



export const DropDownSelect = (props) => {
  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)
  // props should problbly have all the items and their click handlers. Like [{text: string/reference, "onClickHandler": [Function]}]
  const toggleVisibility = () => {
    // doesnt close the dropdown when clicking the selected one.
    console.log("toggling visibility")
    setIsComponentVisible(!isComponentVisible)
  }

  console.log(isComponentVisible)
  if(!isComponentVisible){
    return(
      <div className="dropDownSelectContainer" ref={ref}>
        <div className="dropDownSelectCurrentItemContainer" onClick={toggleVisibility}>
          <div className="dropDownSelectCurrentItem">
            <span className="dropDownSelectText">{props.currentlySelected}</span>
            <DropDownIcon className="dropDownIcon"/>
          </div>
        </div>

        {isComponentVisible?
          <div className="dropDownList" >
            <div className="divider"></div>
            <DropDownList items={[{text:"Project 1", onClickHandler: null}, {text:"Project 2", onClickHandler: null}, {text:"Project 3", onClickHandler: null}]}/>
          </div>
          :
          <div/>
        }
      </div>
    )
  }else{
    return(
      <div className="dropDownSelectContainerActive" ref={ref}>
        <div className="dropDownSelectCurrentItemContainer" onClick={toggleVisibility}>
          <div className="dropDownSelectCurrentItem">
            <span className="dropDownSelectText">{props.currentlySelected}</span>
            <DropDownIcon className="dropDownIcon"/>
          </div>
        </div>

        {isComponentVisible?
          <div className="dropDownList" >
            <div className="divider"></div>
            <DropDownList items={[{text:"Project 1", onClickHandler: null}, {text:"Project 2", onClickHandler: null}, {text:"Project 3", onClickHandler: null}]}/>
          </div>
          :
          <div/>
        }
      </div>
    )
  }

}

export default DropDownSelect