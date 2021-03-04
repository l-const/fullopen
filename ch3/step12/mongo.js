const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const databaseName = "peopledb"
const url = `mongodb+srv://fullstack:${password}@cluster0.fv9ck.mongodb.net/${databaseName}?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)



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


if (process.argv.length === 3) {
    listpersons()
} else {
    insertPerson()
}
