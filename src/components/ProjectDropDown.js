// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"
import useComponentVisible from "../hooks/OutsideClick"

import DropDownList from "./DropDownList"
import {ReactComponent as DropDownIcon} from "../resources/arrow_drop_down-24px.svg"
import "../styles.css"

import {setActiveProject} from "../reducers/projectReducer"



export const ProjectDropDown = (props) => {
  console.log(props.projects)
  const [active, setActive] = useState(props.projects.active)
  //Vertical dropdown select list where one entry is always selected. By pressing the currently selected entry a list expands below with all the options.
  //when one of the items is clicked it is now the currently selected element and the list shrinks.
  //Out of focus click also hides the expanded part.

  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)
  // props should problbly have all the items and their click handlers. Like [{text: string/reference, "onClickHandler": [Function]}]
  const toggleVisibility = () => {
    // doesnt close the dropdown when clicking the selected one.
    console.log("toggling visibility")
    setIsComponentVisible(!isComponentVisible)
  }
  if(!active && props.projects.active){
    setActive(props.projects.active)
  }

  const genListOptions = () => {
    const strings = props.projects.projects.filter(item => item !== props.projects.active)
    let list = []
    strings.map(element => {
      list.push({string: element, onClickHandler: () => {
        props.setActiveProject(element)
        setActive(element)
        setIsComponentVisible(!isComponentVisible)
        console.log(element, " clicked")
      }
      })
    })
    return list
  }

  if(!isComponentVisible){
    return(
      <div className="dropDownSelectContainer" ref={ref}>
        <div className="dropDownSelectCurrentItemContainer" onClick={toggleVisibility}>
          <div className="dropDownSelectCurrentItem">
            <span className="dropDownSelectText">{active}</span>
            <DropDownIcon className="dropDownIcon"/>
          </div>
        </div>

        {isComponentVisible?
          <div className="dropDownList" >
            <div className="divider"></div>
            <DropDownList items={genListOptions()}/>
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
            <span className="dropDownSelectText">{active}</span>
            <DropDownIcon className="dropDownIcon"/>
          </div>
        </div>

        {isComponentVisible?
          <div className="dropDownList" >
            <div className="divider"></div>
            <DropDownList items={genListOptions()}/>
          </div>
          :
          <div/>
        }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    projects: state.projects
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  setActiveProject

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDropDown)