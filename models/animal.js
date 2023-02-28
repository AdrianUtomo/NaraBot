const mongoose = require("mongoose")

const animalSchema = mongoose.Schema({
    type : String,
    name : String,
})

module.exports = mongoose.model('Animal', animalSchema)