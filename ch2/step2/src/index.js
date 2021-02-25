import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {

  const course =  {
    name : "Half Stack application development",
    id: 1,
    parts : [
      { 
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      { 
        name: "State of a component",
        exercises: 14,
        id: 3,
      }
    ]
  };


  return (
    <Course course={course} />
  )
}


const Course = ({course}) => {
 const {name, id, parts} = course;
 return ( 
  <div>
    <Header name = {name} />
    <Content parts = {parts} />
  </div> )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(prt => <Part key={prt.id} part={prt.name} exercise={prt.exercises} />)}
      <Total ex1={parts[0].exercises} ex2={parts[1].exercises} ex3={parts[2].exercises} />
    </div>
  )
}

const Header = ({name}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Total = ({ex1, ex2, ex3}) => {
 return (
   <div>
     <p>Number of exercises {ex1 + ex2 + ex3}</p>
   </div>
 ) 
}

const Part = ({ part, exercise}) => {
  return (
    <div>
      <p>{part} {exercise}</p>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'))

