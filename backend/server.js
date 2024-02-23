require('dotenv').config()

const express = require('express')
const userRoutes = require('./routes/users')
const mongoose = require('mongoose')

// Create the express app
const app = express()

// Middleware to send request body to router
app.use(express.json())

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Route handler
app.use('/api/users', userRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB")
            console.log("Listening for requests on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

