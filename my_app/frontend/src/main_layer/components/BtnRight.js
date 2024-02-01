import React from 'react'
import './Btn.css'

const BtnRight = ({ move }) => {
  return (
    <button onClick={move} className="btnright">
      &#187;
    </button>
  )
}
export default BtnRight