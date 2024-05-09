require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const RateLimit = require('express-rate-limit')
const cors = require('cors')

const customerRoutes = require('./routes/customers')
const userAccountRoutes = require('./routes/userAccount')
const appointmentRoutes = require('./routes/appointments')

// Create the express app
const app = express()

// Middleware to send request body to router
app.use(express.json())

// Rate limiter of 60req/min
app.use(RateLimit({
    windowMs: 60000, // 1 minute
    max: 60,
}))

// Testing
const corsOptions = {
    origin: 'http://localhost'
}

app.use(cors(corsOptions))

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Route handler
app.use('/api/customers', customerRoutes)
app.use('/api/account', userAccountRoutes)
app.use('/api/appointments', appointmentRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {dbName: 'STM_test'})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB")
            console.log("Listening for requests on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

