
import React from 'react';
import Course from './components/Course'

const App = ({courses}) => {

  

  return (
    <div>

    {courses.map(crs => <Course key={crs.id} course={crs} /> )}
    </div>
   
  )
}
export default App