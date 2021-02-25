import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const Statistics = ({good, neutral , bad, all}) => {
  if(all === 0) {
    return (
      <div>
        <p>No feedback given </p>
      </div>
    )
  }
  return (
    <table>
      <Statistic text="good" value={good}/>
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad"  value={bad} />
      <Statistic text="all" value={all} />
      <Statistic text="average" value={((good+(bad *-1))/(all+ Number.EPSILON))}/>
      <Statistic text="positive" value={good/(all + Number.EPSILON) * 100}  />
      </table>
  )
}

const Statistic = ({text, value}) => {
  if(text === "positive") {
   return (
    <tr>
      <td>{text}</td> <td>{value} %</td>
    </tr>
   ) 
  }
  return (
    <tr>
      <td>{text}</td> <td>{value} </td>
    </tr>
  )
}

const Button = ({text, handler}) => {
  return (
    <button onClick={handler}>
      {text}
    </button>
  )
}

const App = () => {
  const [neutral, setNeutral] = useState(0)
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handler = (text) => {
    if(text === "good") {
      return () => {setGood(good+1); setAll(all+1)}
    } else if (text === "bad") {
      return  () => {setBad(bad+1); setAll(all + 1) }
    } else {
      return () => {setNeutral(neutral+1); setAll(all+1)}
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handler = {handler("good")}/>
      <Button text="neutral" handler = {handler("neutral")}/>
      <Button text="bad" handler = {handler("bad")}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

