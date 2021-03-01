import axios from 'axios';
import React, {useEffect, useState } from 'react';
import personService from "./services/persons"

const App  = () => {
  const [ persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')



  useEffect(() => {
    // first download of persons
       personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)

  }

  const addName = (event) => {
    event.preventDefault()
    if(persons.map( p => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    console.log('button clicked', event.target)
    // HTTP POST (create new person)
    const persObj = {name: newName, number: newNumber}
    personService
      .create(persObj)
      .then(resp => {
        console.log(resp)
        setPersons([...persons, persObj])
  })
  }

  const filterNames = (sbstr) => {
    return persons.filter(p => p.name.toLowerCase().includes(sbstr.toLowerCase()))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search}  onChange={handleSearchChange}/>
      <PersonForm 
        submit={addName} 
        na_value = {newName} na_change={handleNameChange}
        nu_value={newNumber}  nu_change={handleNumberChange}
       />
      <h3>Numbers</h3>
      <Persons pers={filterNames(search)} />
    </div>
  )
} 

export default App;

const Filter = ({value, onChange}) => {

  return (
    <div>
    filter shown with <input value={value} onChange={onChange}/>
    </div>
  )
}

const PersonForm = ({submit, na_value, na_change, nu_value, nu_change}) => {

  return (
   <form onSubmit={submit}>
        <div>
          name: <input  value={na_value} onChange={na_change}/>
        </div>
        <div>
          number: <input value={nu_value} onChange={nu_change}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}


const Persons = ({pers}) => {
  return (
    <div>
      {pers.map(p => <p key={p.name}>{p.name + " " + p.number}</p>)}
    </div>
  )
}
