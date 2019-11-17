// By: Niklas Impiö
import {useState, useEffect, useRef} from "react"

//https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

export default function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
  const ref = useRef(null)

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false)
    }
  }

  useEffect(() => {
    //adds a click listener to the document, handle click outside checks if the reference component contains the clicked element etc. read the stackowerflow explanation.
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  })

  return {ref, isComponentVisible, setIsComponentVisible}
}