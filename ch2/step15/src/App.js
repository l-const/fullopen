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
