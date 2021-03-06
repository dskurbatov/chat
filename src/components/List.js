import React from 'react'

const List = (props) => {
  if(!props.messages.length){
    return <h1>No messages</h1>
  }
  return (
    <ul>
      {props.messages.map((message, index) => {
        return <li key={index}>{message}</li>
      })}
    </ul>
  )
}

export default List