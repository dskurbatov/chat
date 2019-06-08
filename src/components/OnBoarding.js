import React from 'react'
import List from './List'
import Form from './Form'
import { questionGenerator } from '../helpers/questions'
import { questions } from '../questions.json'

const gen = questionGenerator(questions, 0)

const firstValue = gen.next().value

export default function OnBoarding (props) {
  const [messages, setMessages] = React.useState([firstValue.question])
  
  const addMessage = (message) => {
    const nMessages = messages.map(item => item)
    nMessages.push(message)
    let value = gen.next(message).value
    if(!value){
      props.setStatus('pationt')
    } else {
      nMessages.push(value.question)
    }
    setMessages(nMessages)
  }
  
  return (
    <React.Fragment>
      <List messages={messages} />
      <Form onMessage={addMessage} />
    </React.Fragment>
  )
}