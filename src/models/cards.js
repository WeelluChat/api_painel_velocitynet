const mongoose = require("mongoose");

const ImageCards = new mongoose.Schema({
    idCards: String,
    image: {type: String, require: true},
    isVisible: {type: String, default: true}
})

const Cards = new mongoose.Schema({
    title: {type: String, require: true},
    isVisible: {type: String, default: true},
    cards: [ImageCards]
})

module.exports = mongoose.model("Cards", Cards); 
 