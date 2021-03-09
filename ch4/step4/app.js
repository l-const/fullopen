const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


logger.info("conntecting to", config.MONDODB_URI)


mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
        .then( () => {
            logger.info("connected to MongoDB")
        })
        .catch((error) => {
            logger.error("error connecting to MongoDB", error)
        })


app.use(cors())
app.use(express.static())
app.use(middleware.requestLogger)

app.use("/api/notes", blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports  = app






















