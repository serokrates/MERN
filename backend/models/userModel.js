const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Please add a text value'],
    },
    email: {
        type:String,
        required: [true, 'Please add a email'],
        unique: true
    },
    password:{
        type:String,
        required: [true, 'Please add a password'],
    },
    // role:{
    //     type:String,
    //     required: [true, 'Please add a role'],
    // },
    status:{
        type:String,
        required: [true, 'Please add a status'],
    }
},{
    // updated at created at, timestamp nam doda kiedy coś zostało stworzone albo zmienione
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)