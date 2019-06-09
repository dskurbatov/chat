import React from 'react'
import List from './List'
import Form from './Form'
import { QuestionsGen } from '../helpers/questions'
import { questions } from '../questions.json'

const gen = new QuestionsGen(questions)

export default function OnBoarding (props) {
  const [messages, setMessages] = React.useState([gen.getNextQuestion()])
  
  const addMessage = (message) => {
    if (gen.validate(message) && gen.isNext(message)){
      setMessages([
        ...messages,
        message,
        gen.getNextQuestion()
      ])
      // setTimeout(() => {
      //   console.log(messages)
      //   const nMessages = messages.map(item => item)
      //   nMessages.push(gen.getNextQuestion())
      //   setMessages(nMessages)
      // }, 1000)
    } else {
      setMessages([
        ...messages,
        message
      ])
    }
  }

  const getDOMElement = (el) => el
  // const addMessage = (message) => {
  //   const nMessages = messages.map(item => item)
  //   nMessages.push(message)
  //   let value = gen.next(message).value
  //   if(!value){
  //     props.setStatus('pationt')
  //   } else {
  //     nMessages.push(value.question)
  //   }
  //   setMessages(nMessages) 
  // }
  
  return (
    <React.Fragment>
      <List messages={messages} onMessage={addMessage}/>
      {/* <Form onMessage={addMessage} getDOM={getDOMElement}/> */}
    </React.Fragment>
  )
}