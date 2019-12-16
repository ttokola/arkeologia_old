// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"


import "../styles/reportPost.css"
import "../styles/buttons.css"
import "../styles/texts.css"




export const ReportPost = (props) => {
  /*
  Report Component
  Pop Up style window that contains Title, Reported post title, few check boxes, text area and buttons
  TODO sends report request to backend.

  TODO Doesn't connect to redux correctly for some reason!!!
  */
  const [reportField, setReportField] = useState("")
  const [nsfwCheck, setNsfwCheck] = useState(false)
  const [profanityCheck, setProfanityCheck] = useState(false)
  const [offensiveCheck, setOffensiveCheck] = useState(false)
  const [topicCheck, setTopicCheck] = useState(false)
  const [otherCheck, setOtherCheck] = useState(false)




  const cancelClick = (event) => {
    event.preventDefault()
    props.history.goBack()

  }

  const submitClick = (event) => {
    event.preventDefault()
    //TODO SUBMIT REPORT
    props.history.goBack()
    props.notify(props.settings.strings["report_submitted"], false, 5)
  }
  console.log(props)
  if(props.posts){
    const post = props.posts.find(item => "" + item.id === props.match.params.id)
    return(
      <div className="reportPostContainer centerAlignWithPadding">
        <h1 className="headerText">{props.settings.strings["report"]}</h1>
        <h2 className="normalText">{post.title}</h2>
        <h2 className="normalText">{props.settings.strings["report_info"]}</h2>
        <div className="inputContainer">
          <input name="NSFW_check" type="checkbox" onChange={() => setNsfwCheck(!nsfwCheck)}/>
          {props.settings.strings["NSFW_content"]}
        </div>
        <div className="inputContainer">
          <input className="checkbox" name="profanity_check" type="checkbox" onChange={() => setProfanityCheck(!profanityCheck)}/>
          {props.settings.strings["profanity"]}
        </div>
        <div className="inputContainer">
          <input name="offensive_check" type="checkbox" onChange={() => setOffensiveCheck(!offensiveCheck)}/>
          {props.settings.strings["offensive_language"]}
        </div>
        <div className="inputContainer">
          <input name="topic_check" type="checkbox" onChange={() => setTopicCheck(!topicCheck)}/>
          {props.settings.strings["off_topic_content"]}
        </div>
        <div className="inputContainer">
          <input name="other_check" type="checkbox" onChange={() => setOtherCheck(!otherCheck)}/>
          {props.settings.strings["other"]}
        </div>
        <div className="inputContainer">
          <textarea name="report_field" id="reportField" className="input" rows="2" placeholder={props.settings.strings["description_optional"]} maxLength="128" autoComplete="off" value={reportField} onChange={setReportField}/>
          <div className="inputFocusLine"/>
        </div>

        <div className="postFormButtonContainer">
          <button className="rippleButton negativeButton fillButton" onClick={cancelClick}>{props.settings.strings["cancel"]}</button>
          <button className="rippleButton positiveButton fillButton" onClick={submitClick}>{props.settings.strings["submit"]}</button>
        </div>

      </div>
    )
  }
  return(
    <div/>
  )

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    settings: state.settings,
    posts: state.posts

  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportPost)