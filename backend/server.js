require('dotenv').config()
const express = require('express')
const loginRouts = require('./routes/login')
const mongoose = require('mongoose')
const cors = require('cors')

//Creates express application
const app = express()

//middleware __________________________________________
app.use(express.json())
app.use(cors())

//Logs all requests to api
app.use((req, res, next) => {
    console.log(req.path, req.method, req.body)
    next()
})

//Routes ______________________________________________
app.use('/api', loginRouts)

//app.use('/game', gameRouts)




//_____________________________

//connects to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT, () => {
            console.log('Connected to the database and listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })



