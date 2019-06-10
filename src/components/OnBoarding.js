import React from 'react'
import PropTypes from 'prop-types'
import Form from './Form'
import { QuestionsGen } from '../helpers/questions'
import { questions } from '../questions.json'
import { 
  connectToSocket,
  lastQuestion,
  validAnswer,
  notValidAnswer,
  nextQuestion,
  firstQuestion
 } from '../redux/actions'

const jsonUrl = 'https://gist.githubusercontent.com/pcperini/97fe41fc42ac1c610548cbfebb0a4b88/raw/cc07f09753ad8fefb308f5adae15bf82c7fffb72/cerebral_challenge.json'

let gen = null

export default class OnBoarding extends React.Component {

  addMessage = (message) => {
    const { store } = this.context
    
    if(gen.validate(message) && gen.isNext(message)){
      const id = gen.getCurrentQuestionId()
      const question = gen.getNextQuestion()
      
      store.dispatch(validAnswer(id, message))
        .then(() => this.focus())
      
      if(gen.isLast()){
        return store.dispatch(lastQuestion(question))
          .then(() => this.focus())
      }

      return store.dispatch(nextQuestion(question))
        .then(() => this.focus())
    } else {
      const { questions } = store.getState()
      const prevQuestion = questions[questions.length - 1]
    
      return store.dispatch(notValidAnswer(message, prevQuestion))
        .then(() => this.focus())
    }
  }
  
  componentDidMount(){
    fetch(jsonUrl)
      .then(res => res.json())
      .then(questions => gen = new QuestionsGen(questions))
      .then(() => {
        const { store } = this.context
        const question = gen.getNextQuestion()
        
        store.dispatch(firstQuestion(question))
      })
  }

  connect = () => {
    const { store } = this.context
    const socket = new WebSocket('wss://echo.websocket.org')

    socket.onopen = () => {
      store.dispatch(connectToSocket).then(() => this.focus())
    }
  }

  focus = () => {
    const len = Object.keys(this.refs).length
    this.refs[len - 1].scrollIntoView()
  }

  buildMessages = (questions, answers) => {
    const messages = []
    let i = 0, j = 0
    while(i < questions.length && j < answers.length){
      messages.push(questions[i], answers[j])
      i++;
      j++
    }
    while(i < questions.length){
      messages.push(questions[i])
      i++;
    }
    while(j < answers.length){
      messages.push(answers[j])
      j++
    }
    return messages
  }
  
  render(){
    const { store } = this.context
    const { questions, answers, isTyping, isPatient, isConnected } = store.getState()
    const messages = this.buildMessages(questions, answers)
    
    return (
      <React.Fragment>
        <ul>
          {messages.map((message, index) => {
            return <li key={index} ref={index}>{message}</li>
          })}
        </ul>
        <p>{isTyping ? 'typing...' : ''}</p>
        {isPatient && !isConnected && <button onClick={this.connect}>Connect To Doctor</button>}
       <Form onMessage={this.addMessage}/> 
      </React.Fragment>
    )
  }
}

OnBoarding.contextTypes = {
  store: PropTypes.object
}