import React from 'react'

const Btn = ({btnText = 'SignIn' , btnType = "button" , btnClick , btnClass = 'navBtn'}) => {
  return (
    <div>
        <button type={btnType} onClick={btnClick} className={btnClass}>{btnText}</button>
    </div>
  )
}

export default Btn