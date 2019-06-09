import React from 'react'
import List from './List'
import Form from './Form'
import { QuestionsGen } from '../helpers/questions'
import { questions } from '../questions.json'

const gen = new QuestionsGen(questions)

export default class OnBoarding extends React.Component {
  state = {
    messages: [gen.getNextQuestion()],
    isConnected: false,
    status: 'onboarding'
  }
  
  addMessage = (message) => {
    if(gen.validate(message) && gen.isNext(message)){
      this.setState((oldState, props) => {
        console.log(gen.isEnd())
        return {
          ...oldState,
          status: (gen.isEnd() ? 'onboard' : oldState.status),
          messages: [
            ...oldState.messages,
            message,
            gen.getNextQuestion()
          ]
        }
      }, this.focus)
    }
  }

  connect = () => {
    const socket = new WebSocket('wss://echo.websocket.org')

    socket.onopen = () => {
      this.setState((oldState, props) => {
        return {
          ...oldState,
          isConnected: true,
          messages: [
            ...oldState.messages,
            'Doctor is now connected'
          ]
        }
      }, this.focus)
    }
  }

  focus = () => {
    this.refs[this.state.messages.length - 1].scrollIntoView()
  }
  
  render(){
    return (
      <React.Fragment>
        <ul>
          {this.state.messages.map((message, index) => {
            return <li key={index} ref={index}>{message}</li>
          })}
        </ul>
        {this.state.status === 'onboard' && !this.state.isConnected && <button onClick={this.connect}>Connect To Doctor</button>}
        <Form onMessage={this.addMessage} />
      </React.Fragment>
    )
  }
}