const mongoose = require("mongoose")


const url = process.env.MONGODB_URI
//      `mongodb+srv://fullstack:${password}@cluster0.fv9ck.mongodb.net/note-app?retryWrites=true`


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then( result => {
            console.log("Connected to MongoDB")
        })
        .catch((error) => {
            console.log("error connecting to MONGODB", error.message)
        })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
