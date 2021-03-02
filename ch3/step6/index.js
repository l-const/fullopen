const { request, response } = require("express")
const express = require("express")
const app = express()

app.use(express.json())


let persons = [
    {id:1, name: "Arto Hellas", number: "040-123456"},
    {id:2, name: "Ada Lovelace", number: "39-44-5323523"},
    {id:3, name: "Dan Abramov", number: "12-43-234345"},
    {id:4, name: "Mary Poppendick", number: "39-23-6423122"},
]

app.get("/", (request, response) => {
    response.send("<h1>Hello World</h1>")
})


app.get("/info", (request, response) => {
    const time = new Date()
    const p_len = persons.length
    const html = `<p>Phonebook has info for ${p_len} people <p>${time}</p></p>`
    response.send(html)

})

const getRandomInt = (max)  => {
  return Math.floor(Math.random() * Math.floor(max));
}

app.get("/api/persons", (request, response) => {
    response.json(persons)
})


app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if(person){
        response.json(person)
    } else {
        response.status(404).end
    }
})

app.post("/api/persons", (request, response) => {
    const body = request.body
    console.log("POST request.body => ", body)
    if(!body.number){
        return response.status(400).json({
            error: "number is missing"
        })
    } else if (!body.name) {
        return response.status(400).json({
            error: "name missing"
        })
    } else if(persons.map(p => p.name).includes(body.name)) {
            
            return response.status(400).json({
                error: "name must be unique"
            })
    } else {
        console.log(body)
    }
    const person = {
        name: body.name,
        number: body.number,
        id: getRandomInt(100000)
    }
    persons = persons.concat(person)
    response.json(person)
})


app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons  = persons.filter(p => p.id !== id)
    console.log("DELETE request.id=> ", id)

    response.status(204).end()

})

const PORT=3001 
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
    console.log(`\nIndex  @ http://localhost:${PORT}`)
})


