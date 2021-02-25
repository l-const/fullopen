import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {

  const courses = [
     {
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
  },
  {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }  
  ];


  return (
    <div>

    {courses.map(crs => <Course key={crs.id} course={crs} /> )}
    </div>
   
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
      <Total res={parts.map(i => i.exercises).reduce((i,j) => i+j)}/>
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

const Total = ({res}) => {
 return (
   <div>
     <h3>total of {res} exercises</h3>
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

