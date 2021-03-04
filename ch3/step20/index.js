require("dotenv").config();
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/persons");
const { response } = require("express");
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))


app.get("/", (request, response) => {
    response.send("<h1>Hello World</h1>")
})


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)


app.get("/info", (request, response) => {
    Person.find({}).then(persons =>{
        const time = new Date()
        const p_len = persons.length
        const html = `<p>Phonebook has info for <strong>${p_len}</strong> people <p>${time}</p></p>`
        response.send(html)
    })

})


app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons =>{
        response.json(persons)
    })
})


app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person){
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))

})


app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
            .then(resp => {console.log(resp)})
            .catch(error=> next(error))
    response.status(204).end()
})


app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, {new:true})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
    console.log(`\nIndex  @ http://localhost:${PORT}`)
})


