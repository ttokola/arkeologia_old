// By: Niklas Impiö
import {supported_languages, language_strings} from "../strings/stringStorage.json"
const initialState = {languages: supported_languages,
  activeLanguage: supported_languages[0],
  strings: language_strings[supported_languages[0]],
  themes:["dark","light"],
  activeTheme: "dark"
}

const changeThemeInCSS = (theme) => {
  if(theme === "dark"){
    document.documentElement.style.setProperty("--primary-color","#161616")
    document.documentElement.style.setProperty("--secondary-color","#1b1c1d")
    document.documentElement.style.setProperty("--primary-text-color","#ffffff")
    document.documentElement.style.setProperty("--secondary-text-color","#a0a0a0")
    document.documentElement.style.setProperty("--accent-color","#383838")
    document.documentElement.style.setProperty("--accent-color-dark","#1v1c1d")
    document.documentElement.style.setProperty("--accent-color-light","#808080")
    document.documentElement.style.setProperty("--effect-color","#cecece")
  }else{
    document.documentElement.style.setProperty("--primary-color","#ffffff")
    document.documentElement.style.setProperty("--secondary-color","#e0e0e0")
    document.documentElement.style.setProperty("--primary-text-color","#000000")
    document.documentElement.style.setProperty("--secondary-text-color","#505050")
    document.documentElement.style.setProperty("--accent-color","#ffffff")
    document.documentElement.style.setProperty("--accent-color-dark","#e0e0e0")
    document.documentElement.style.setProperty("--accent-color-light","#ffffff")
    document.documentElement.style.setProperty("--effect-color","#ffffff")
  }
}

const settingsReducer = (state = initialState, action) => {
  //dispatch actions defined here.
  switch(action.type){
  case "INIT_SETTINGS":
    console.log("initing settings")
    if(state.languages.includes(action.data.language) && state.themes.includes(action.data.theme)){
      changeThemeInCSS(action.data.theme)
      return {languages: state.languages, activeLanguage: action.data.language, strings: language_strings[action.data.language],  themes: state.themes, activeTheme: action.data.theme}
    }else if (state.languages.includes(action.data.language) && !state.themes.includes(action.data.theme)){
      return {languages: state.languages, activeLanguage: action.data.language, strings: language_strings[action.data.language],  themes: state.themes, activeTheme: state.activeTheme}
    }else if (!state.languages.includes(action.data.language) && state.themes.includes(action.data.theme)){
      changeThemeInCSS(action.data.theme)
      return {languages: state.languages, activeLanguage: state.activeLanguage, strings: state.strings,  themes: state.themes, activeTheme: state.activeTheme}
    }

    return state
  case "SET_ACTIVE_LANGUAGE":
    if(state.languages.includes(action.data)){
      window.localStorage.setItem("ChimneysGoLanguage", action.data)
      return {languages: state.languages, activeLanguage: action.data, strings: language_strings[action.data], themes: state.themes, activeTheme: state.activeTheme}
    }
    return state
  case "SET_ACTIVE_THEME":
    if(state.themes.includes(action.data)){
      window.localStorage.setItem("ChimneysGoTheme", action.data)
      changeThemeInCSS(action.data)
      return {languages: state.languages, activeLanguage: state.activeLanguage, strings: state.strings, themes: state.themes, activeTheme: action.data}
    }
    return state
  default:
    return state
  }
}

export const initSettings = (settingsJSON) => {
  return dispatch => {
    dispatch({
      type: "INIT_SETTINGS",
      data: settingsJSON
    })
  }
}

export const setActiveLanguage = (languageCode) => {

  return dispatch => {
    dispatch({
      type: "SET_ACTIVE_LANGUAGE",
      data: languageCode
    })
  }
}

export const setActiveTheme = (theme) => {
  return dispatch => {
    dispatch({
      type: "SET_ACTIVE_THEME",
      data: theme
    })
  }
}

export default settingsReducer