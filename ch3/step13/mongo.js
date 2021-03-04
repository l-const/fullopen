const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const databaseName = "peopledb"
const url = `mongodb+srv://fullstack:${password}@cluster0.fv9ck.mongodb.net/${databaseName}?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(res => {
             console.log('connected to MongoDB')
        })
        .catch((error) => {
            console.log('error connecting to MongoDB:', error.message)
        })


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)


let persons = [
    {id:1, name: "Arto Hellas", number: "040-123456"},
    {id:2, name: "Ada Lovelace", number: "39-44-5323523"},
    {id:3, name: "Dan Abramov", number: "12-43-234345"},
    {id:4, name: "Mary Poppendick", number: "39-23-6423122"},
]


const insertPerson = () => {
    const person = new Person({
        name: process.argv[3] || "",
        number: process.argv[4] || "",
    })

    person.save().then(result => {
        console.log(`added ${result.name} ${result.number} to phonebook`)
        mongoose.connection.close()
    })


}


const listpersons = () => {
    console.log("phonebook:\n")
    Person
        .find({})
        .then(persons => {
            if (persons) {
                persons.forEach(per => console.log(per.name, per.number))
            }
                mongoose.connection.close()
        })
}

Person.insertMany(persons)
    .then(()=>{console.log("Persons inserted")})
    .catch((error) =>{console.log(error.message)})
if (process.argv.length === 3) {
    listpersons()
} else {
    insertPerson()
}
