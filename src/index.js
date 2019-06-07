import React from 'react'
import ReactDOM from 'react-dom'

const q = [
  {
    id: 0,
    question: 'How are you?',
    paths: {
      good: 1,
      bad: 2
    },
    done: false
  },
  {
    id: 1,
    question: 'what is new?',
    paths: {
      nothing: 3
    },
    done: false
  },
  {
    id: 2,
    question: 'I am sorry to hear that. Bye bye!!!',
    paths: {},
    done: true
  },
  {
    id: 3,
    question: 'See ya!!!',
    paths: {}, 
    done: true
  }
]

function *qGenerator(q, id){
  while(!q[id].done){
    let answer = yield q[id]
    console.log(answer, 'answer')
    id = q[id].paths[answer]
    console.log(id, 'id')
  }
  yield q[id]
}

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

const Form = (props) => {
  const [value, setValue] = React.useState('')
  
  const onClick = (e) => {
    e.preventDefault()
    
    props.onMessage(value)
    setValue('')
  }
  
  return(
    <form>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={onClick}>Submit</button>
    </form>
  )
}

const App  = (props)  => {
  const gen = qGenerator(q, 0)
  let value = gen.next().value
  const [messages, setMessages] = React.useState([value.question])
  
  const addMessage = (message) => {
    const nMessages = messages.map(item => item)
    nMessages.push(message)
    console.log(q[1].paths['nothing'], message === 'nothing', 'add', gen.next(message))
    setMessages(nMessages)
  }
  
  return (
    <div>
      <h1>Hello World!!!</h1>
      <List messages={messages} />
      <Form onMessage={addMessage}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))