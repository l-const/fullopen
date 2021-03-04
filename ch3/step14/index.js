require("dotenv").config();
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/persons")
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))


app.get("/", (request, response) => {
    response.send("<h1>Hello World</h1>")
})


app.get("/info", (request, response) => {
    const time = new Date()
    const p_len = persons.length
    const html = `<p>Phonebook has info for ${p_len} people <p>${time}</p></p>`
    response.send(html)

})



app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons =>{
        response.json(persons)
    })
})


app.get("/api/persons/:id", (request, response) => {
    Person.findById(request.params.id).then(note => {
        response.json(person)
    })
})


app.delete("/api/persons/:id", (request, response) => {
    Person.findByIdAndRemove(request.params.id)
            .then(resp => console.log(resp))
            .catch(error=> console.log(error.message))
    response.status(204).end()
})

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
})
)


app.post("/api/persons", (request, response) => {
    const body = request.body
    // console.log("POST request.body => ", body)
    if(!body.number){
        return response.status(400).json({
            error: "number is missing"
        })
    } else if (!body.name) {
        return response.status(400).json({
            error: "name missing"
        })
    }


    const person = new Person ({
        name: body.name,
        number: body.number,
       
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})




const unkownEndpoint = (request, response) => {
    response.status(404).send({error: "unkown endpoint"})
}

app.use(unkownEndpoint)

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
    console.log(`\nIndex  @ http://localhost:${PORT}`)
})


