import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {

  const course =  {
    name : "Half Stack application development",
    parts : [
      { 
        name: "Fundamentals of React",
        exercises: 10
      },
      
      {
        name: "Using props to pass data",
        exercises: 7
      },
      { 
        name: "State of a component",
        exercises: 14
      }
    ]
  };


  return (
  <div>
    <Header crs = {course.name}/>
    <Part part={course.parts[0].name} exercise={course.parts[0].exercises}/>
    <Part part={course.parts[1].name} exercise={course.parts[1].exercises}/>
    <Part part={course.parts[2].name} exercise={course.parts[2].exercises}/>
    <Total ex1={course.parts[0].exercises} ex2={course.parts[1].exercises} ex3={course.parts[2].exercises} />
  </div> 
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.crs}</h1>
    </div>
  )
}

const Total = (props) => {
 return (
   <div>
     <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
   </div>
 ) 
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'))

