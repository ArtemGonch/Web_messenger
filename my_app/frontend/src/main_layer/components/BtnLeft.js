import React from 'react'
import './Btn.css'

const BtnLeft = ({ move }) => {
  return (
    <button onClick={move} className="btnleft">
      &#171;
    </button>
  )
}
export default BtnLeft