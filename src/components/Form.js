import React from 'react'

const Form = (props, context) => {
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


export default Form