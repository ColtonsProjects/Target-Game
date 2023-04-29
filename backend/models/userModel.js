const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    first_n: {
        type:String,
        required:true
    },
    last_n: {
        type:String
        
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    username: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
        unique:false //This is not working?
    },
    highScore: { 
        type: Number, 
        default : 0 
    }
}, {timestamps: true})


module.exports = mongoose.model('User', userSchema)
