import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  const [neutral, setNeutral] = useState(0)
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={ () => {
        setGood(good+1); setAll(all+1) 
      }
    }>
      good
      </button>
      <button onClick={ () => {
        setNeutral(neutral+1); setAll(all+1)
        }
      }>
      neutral
      </button>
     
      <button onClick={ () => {
        setBad(bad+1); setAll(all + 1) 
        }
      }>
      bad
      </button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral} </p>
      <p>bad {bad} </p>
      <p>all {all} </p>
      <p>average {((good+(bad *-1))/(all+ Number.EPSILON))}</p>
      <p>positive {good/(all + Number.EPSILON) * 100} %</p>
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

