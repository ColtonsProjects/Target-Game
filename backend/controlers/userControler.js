const user = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


// Login
const loginUser = async (req, res) => {
    const {username, password} = req.body
    const cur_user = await user.findOne({username})

    try{
        if(!cur_user){
            res.status(400).json({mssg: 'User does not exsist'})
        }
        else {
            const passwordCheck = (await bcrypt.compare(password, cur_user.password))
            if(!passwordCheck){
                res.status(400).json({mssg: 'Incorrect password'})
            }
            else{
                //successfuly logged user in -> go to the application
                res.status(200).json({ cur_user });
            } 
        }
    }catch (error){
        res.status(400).json({error: error.message})
    }
}
  

  

const updateScore = async (req, res) => {
    try{
        const {username, highScore} = req.body;
        const update = await user.findOneAndUpdate({username}, {highScore: highScore});
        const update2 = await user.findOneAndUpdate({username}, {highScore: highScore});
        res.status(200).json(update2);
    }catch (error){
        res.status(400).json({error: error.message})
    }
};


// Register
const createUser = async (req, res) => {
    const {first_n, last_n, email, username, password} = req.body
    const cur_user = await user.findOne({username})
    if(!cur_user){
        try{
            const hashed = await bcrypt.hash(password, 10);
            const new_user = await user.create({first_n, last_n, email, username, password: hashed, highScore: 0});
            const cur_user = new_user;
            res.status(200).json({  cur_user });
        }catch (error){
            res.status(400).json({error: error.message})
        }
    }
    else{
        res.status(400).json({mssg: 'Username is taken'})
    }
}


module.exports = {
    createUser,
    loginUser,
    updateScore,
}