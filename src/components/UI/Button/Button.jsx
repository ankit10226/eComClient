import React from 'react'

const Button = (props) => {
  return (
    <button
      {...props} 
      className={`font-semibold py-1 px-3 rounded-sm cursor-pointer ${props.className}`}
    >
      {props.children}
    </button>
  )
}

export default Button
