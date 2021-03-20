import React from 'react'



const Notification = ({ message, type }) => {
  if(message === null){
    return null
  }
  let className='message'

  if(type === 'good'){
    className='message good'
  } else {
    className='message bad'
  }
  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification