const express = require('express')
const router = express.Router()
const {
    createUser,
    loginUser,
    updateScore,
    getUser
} = require('../controlers/userControler')


// API ___________________________________________________


//Logs in as a user
router.post('/login', loginUser)

//Creates a new user
router.post('/register', createUser)

//Update users high score
router.patch('/patch', updateScore)



module.exports = router