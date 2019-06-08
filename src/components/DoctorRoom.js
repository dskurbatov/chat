import React from 'react'
import List from './List'
import Form from './Form'

export default function DoctorRoom (props) {
  const [messages, setMessage ] = React.useState(['connecting...'])
  const [connected, setConnection] = React.useState(false)

  React.useEffect(() => {
    !connected && connect()
  })
  
  const connect = () => {
    const socket = new WebSocket('wss://echo.websocket.org')

    socket.onopen = () => {
      setConnection(true)
      setMessage(['Websocket is connected'])
    }
  }

  const addMessage = (message) => {
    setMessage([
      ...messages,
      message
    ])
  }
  
  return (
    <React.Fragment>
      <List messages={messages} />
      <Form onMessage={addMessage} />
      {/* <button onClick={connect}>Connect to Doctor</button>  */}
    </React.Fragment>
  )
}