// import axios from 'axios';
import React, {useEffect, useState } from 'react';
import personService from "./services/persons"
import Notification from "./components/Notification"


const App  = () => {
  const [ persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notifMessage, setNotifMessage] = useState('')
  const [mType, setMtype] = useState("good")


  useEffect(() => {
    // first download of persons
       personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
          setNotifMessage("Downloaded initial resources!")
          setMtype("good")
        })

        setTimeout(()=> {
          setNotifMessage(null)
        }, 2000)
        
  }, [])

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleSearchChange = (event) => {
    //console.log(event.target.value)
    setSearch(event.target.value)

  }

  const addName = (event) => {
    event.preventDefault()
    // if(persons.map( p => p.name).includes(newName)) {
    //   alert(`${newName} is already added to phonebook`)
    //   return
    // }
    
    const fperson = persons.find(p => p.name === newName && p.number !== newNumber)
    if( fperson  !== undefined) {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(confirm){
        personService
          .update(fperson.id, {name:newName, number:newNumber})
          .then(returnedPeson => {
            console.log(returnedPeson)
            setPersons(persons.map(per => per.name !== fperson.name ? per : returnedPeson))
          
          })
          .catch(error => {
              console.log(error.response.data.error)
              setNotifMessage(`${error.response.data.error}`)
              setMtype("bad")
              setTimeout(() => {
                  setNotifMessage(null)
              }, 2000)
          })
          return
      }
    }
    
    // HTTP POST (create new person)

    const persObj = {name: newName, number: newNumber}
    personService
      .create(persObj)
      .then(resp => {
        console.log(resp)
        setPersons([...persons, persObj])
        setNotifMessage(` ${persObj.name} created successfully`)
        setMtype("good")
        setTimeout(() => {
          setNotifMessage(null)
        }, 2000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setNotifMessage(`${error.response.data.error}`)
        setMtype("bad")
        setTimeout(() => {
          setNotifMessage(null)
        }, 2000)
      })
  }

  const filterNames = (sbstr) => {
    return persons.filter(p => p.name.toLowerCase().includes(sbstr.toLowerCase()))
  }

  const dropUser = (ev) => {
    ev.target.style.backgroundColor = "#6960EC";
    const confirm = window.confirm(`Delete ${ev.target.name}`)

    if (confirm){

      const dropId = persons.find(p => p.name === ev.target.name).id
      personService
        .drop(dropId)
        .then(deluser => {
          //console.log(deluser)
          setPersons(persons.filter(p => p.id !== dropId))
          setNotifMessage(` ${ev.target.name} deleted successfully`)
          setMtype("good")  
          setTimeout( () => {
              setNotifMessage(null)
            }, 2000)
        })
        .catch(error => {
          setNotifMessage(`${ev.target.name} is already deleted! Error`)
          setMtype("bad")
          setTimeout(() => {
            setNotifMessage(null)
          }, 4000)

        }) 
    }

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} type={mType}/>
      <Filter value={search}  onChange={handleSearchChange}/>
      <PersonForm 
        submit={addName} 
        na_value = {newName} na_change={handleNameChange}
        nu_value={newNumber}  nu_change={handleNumberChange}
       />
      <h3>Numbers</h3>
      <Persons pers={filterNames(search)} dropHandler={dropUser}/>
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


const Persons = ({pers, dropHandler}) => {
  return (
    <div>
      {pers.map(p => <p key={p.name}>{p.name + " " + p.number}<button key={p.id} name={p.name} onClick={dropHandler}>delete</button></p>)}
    </div>
  )
}
