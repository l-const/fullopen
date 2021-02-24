import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = ({counter}) => {
  return (
    <div>
      {counter}
    </div>
  )
}


const Button = ({onClickHandler, text}) => {
  return (
  <div>
    <button onClick={onClickHandler}>
      {text}
    </button>
  </div>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0) 
  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)
  
  return (
    <div>
    <Display counter={counter}/>
    <Button onClickHandler={increaseByOne} text="plus" />
    <Button onClickHandler={setToZero} text="zero" /> 
    <Button onClickHandler={decreaseByOne} text="minus" /> 
    </div>
  )
}


ReactDOM.render(<App />,
  document.getElementById('root'))