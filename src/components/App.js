import React from 'react'
import PropTypes from 'prop-types'
import OnBoarding from './OnBoarding'
import DoctorRoom from './DoctorRoom'

const App = (props, context) => { 
  return (
    <div className="chat">
      <h1>Hello World!!!</h1>
      <OnBoarding />
    </div>
  )
}

App.contextTypes = {
  store: PropTypes.object
}

export default App