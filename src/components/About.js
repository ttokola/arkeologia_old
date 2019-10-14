import React from "react"


//probably make individual css files for all you use here.

export const About = (props) => {
  // only takes Router history as props to manage the router state and url address.
  // about probably gets its content from some string file, since that doesn't need to be in the database.
  // just write some placeholder strings on variables.
  const closeClick = (event) => {
    //go back to the previous page
    event.preventDefault()
    console.log("closebutton clicked")
    props.history.goBack()
  }

  //html stuff here
  return(
    <div>
      <h1>ABOUT</h1>
      <button onClick={closeClick}>CLOSE</button>

    </div>

  )
}

export default About