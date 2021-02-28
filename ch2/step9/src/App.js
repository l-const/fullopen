import React, {useState } from 'react';


const App  = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "040-1234567"},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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
    setPersons([...persons, {name: newName, number: newNumber}])
  }

  const filterNames = (sbstr) => {
    return persons.filter(p => p.name.toLowerCase().includes(sbstr.toLowerCase()))
  }


  return (
    <div>
     
      <h2>Phonebook</h2>
      filter shown with <input value={search} onChange={handleSearchChange}/>
      <form onSubmit={addName}>
        <div>
          name: <input  value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input  value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterNames(search).map(p => <p key={p.name}>{p.name + " " + p.number}</p>)}
    </div>
  )
} 
export default App;
