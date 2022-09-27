const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    text: {
        type:String,
        required: [true, 'Please add a text value'],
    },
},{
    // updated at created at, timestamp nam doda kiedy coś zostało stworzone albo zmienione
    timestamps: true,
})

module.exports = mongoose.model('Goal', goalSchema)