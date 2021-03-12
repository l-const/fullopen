const mongoose = require("mongoose")

if(process.argv.length < 3){
    console.log("Pleaseprovide the password as an argument: node mongo.js <password>")
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.fv9ck.mongodb.net/note-app?retryWrites=true`


mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology: true, useFindAndModify:false, useCreateIndex: true})

const noteSchema  = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

let notes = [
  {
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]


// notes.forEach(nt => {
    
//     let note = new Note(nt)
//     note.save().then(result => {
//         console.log("note saved!")

//     })
// })

// Note.insertMany(notes)
//     .then( () => console.log("data inserted"))
//     .catch((error) => console.log(error))

Note.find({}).then( result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

