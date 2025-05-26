import React from 'react'

const TextArea = (props) => {
  return (
    <div className='my-2'> 
        <textarea placeholder={props.label} type={props.type} name={props.name} id={props.id} className={`shadow-lg rounded-sm w-full px-2 py-1 font-light text-cyan-950 bg-white border-1 border-gray-300 hover:border-gray-500 hover:transition ease-linear ${props.className}`} value={props.value} onChange={props.onChange} onBlur={props.onBlur}/>
    </div>
  )
}

export default TextArea
