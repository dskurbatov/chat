import React from 'react'
import OnBoarding from './OnBoarding'
import DoctorRoom from './DoctorRoom'



const Room = (props) => {
  const { status } = props

  if(status === 'pationt'){
    return <DoctorRoom />
  } else {
    return <OnBoarding setStatus={props.setStatus} />
  }
}

const App = (props) => { 
  const [status, setStatus] = React.useState('onboarding')
  
  return (
    <div>
      <h1>Hello World!!!</h1>
      <Room status={status} setStatus={setStatus} />
    </div>
  )
}

export default App