const mongoose = require('mongoose');

// Fruit Schema
const FruitSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: "no-image.png"
    }
});

module.exports = mongoose.model('Fruit', FruitSchema);