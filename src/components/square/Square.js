import React from "react"
import "./square.css"

const Square = (props) => {
  return (
    <button className="square" onClick={props.handleClick}>
      {props.data}
    </button>
  )
}

export default Square
