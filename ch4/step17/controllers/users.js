const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")


usersRouter.post("/", async (request, response) => {
    const body = request.body

    if (body.username === undefined || body.password === undefined){
        return response.status(400).json({error: "Username or password missing!"})
        
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.get("/", async (request, response) => {
    const users =  await User
        .find({})
        .populate("blogs", {url: 1, title: 1 , author: 1, id : 1})
        
    response.json(users)
})


module.exports = usersRouter