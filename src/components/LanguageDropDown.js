// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"
import useComponentVisible from "../hooks/OutsideClick"

import DropDownList from "./DropDownList"
import {ReactComponent as DropDownIcon} from "../resources/arrow_drop_down-24px.svg"
import "../styles.css"

import {setActiveLanguage} from "../reducers/settingsReducer"



export const LanguageDropDown = (props) => {
  console.log(props)
  const [active, setActive] = useState(props.settings.activeLanguage)
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


  const genListOptions = () => {
    console.log(props.settings)
    const strings = props.settings.languages.filter(item => item !== props.settings.activeLanguage)
    let list = []
    strings.map(element => {
      list.push({string: element.toUpperCase(), onClickHandler: () => {
        props.setActiveLanguage(element)
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
      <div className="languageDDContainer" ref={ref}>
        <div className="languageDDCurrentItemContainer" onClick={toggleVisibility}>
          <div className="languageDDCurrentItem">
            <span className="languageDDText">{active.toUpperCase()}</span>
            <DropDownIcon className="dropDownIcon"/>
          </div>
        </div>

        {isComponentVisible?
          <div className="dropDownList" >
            <DropDownList items={genListOptions()}/>
          </div>
          :
          <div/>
        }
      </div>
    )
  }else{
    return(
      <div className="languageDDContainerActive" ref={ref}>
        <div className="languageDDCurrentItemContainer" onClick={toggleVisibility}>
          <div className="languageDDCurrentItem">
            <span className="languageDDTextActive">{active.toUpperCase()}</span>
            <DropDownIcon className="dropDownIconActive"/>
          </div>
        </div>

        {isComponentVisible?
          <div className="dropDownList" >
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
  console.log(state)
  return {
    //maps state to props, after this you can for example call props.notification
    settings: state.settings
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  setActiveLanguage,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageDropDown)