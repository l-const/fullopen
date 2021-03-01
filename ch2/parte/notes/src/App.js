import React, {useEffect , useState} from 'react';
import axios from 'axios';
import Note from './components/Note'
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log("effect")
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
        })
  }, [])


  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }
    noteService
      .create(noteObject)
      .then(returndNote => {
        setNotes(notes.concat(returndNote))
        setNewNote('')
      })

  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find( n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
    .update(url, changedNote)
    .then( returndNote=> {
      setNotes(notes.map(note => note.id !== id ? note : returndNote))
    })
    .catch( error => {
      alert(
        `the note '${note.content}' was already delted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
    // console.log(`importance of ${id} needs to be toggled`)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map((note, i) => 
          <Note key={i} note={note} toggleImportance={ () => {toggleImportanceOf(note.id)}}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App;
