// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"

import {setActiveTheme} from "../reducers/settingsReducer"

import {ReactComponent as DarkModeIcon} from "../resources/dark_mode_icon.svg"
import {ReactComponent as LightModeIcon} from "../resources/light_mode_icon.svg"
import "../styles/themeToggleSwitch.css"

export const ThemeToggleSwitch = (props) => {
  const [darkMode, setDarkMode] = useState(props.settings.activeTheme === "dark")

  const toggleTheme = () => {
    // doesnt close the dropdown when clicking the selected one.
    console.log("toggling visibility")
    console.log(props)
    if(darkMode){
      props.setActiveTheme("light")
      setDarkMode(false)
    }else{
      props.setActiveTheme("dark")
      setDarkMode(true)

    }
  }


  console.log("darkMode", props.settings.theme === "dark")
  /*
  if(theme === "dark"){
    return(
      <div className="ttbContainer">
        <button onClick={toggleTheme} className="lightButton">
          <LightModeIcon/>
        </button>
      </div>
    )
  }else{
    return(
      <div className="ttbContainer">
        <button onClick={toggleTheme} className="darkButton">
          <DarkModeIcon/>
        </button>
      </div>
    )
  }
  */
  return(
    <div className="ttsContainer">
      <span className="themeLabelText">{props.settings.strings["dark_mode"]}</span>
      <label className="switch">
        <input type="checkbox" checked={darkMode} onChange={toggleTheme}/>
        <span className="sliderRound"></span>
      </label>
    </div>
  )


}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification

    settings: state.settings
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  setActiveTheme

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeToggleSwitch)