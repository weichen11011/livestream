import React from 'react'
import Signin from '../page/Signin.jsx'

const modal = ({isvisible, onclose}) => {
  if ( !isvisible) return null;
  const handleClose = (e) => {
    if( e.target.id === 'wrapper' ) onclose();
  }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    flex justify-center items-center' id='wrapper' onClick={handleClose}>
      <Signin onclose={onclose}/>
    </div>
  )
}

export default modal

