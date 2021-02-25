
import React from 'react';


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
export default Course