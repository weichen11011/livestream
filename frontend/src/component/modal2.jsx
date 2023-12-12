import React from 'react'
import Signup from '../page/signup.jsx'

const modal2 = ({isvisible, onclose}) => {
  if ( !isvisible) return null;
  const handleClose = (e) => {
    if( e.target.id === 'wrapper' ) onclose();
  }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    flex justify-center items-center' id='wrapper' onClick={handleClose}>
      <Signup onclose2={onclose}/>
    </div>
  )
}

export default modal2