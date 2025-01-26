const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet','spicy','sour'],
        required: true
    },
    is_drink:{
        type: Boolean,
        default: false
    },
    ingrediants: {
        type: [String],
        default: []
    },
    sales: {
        type: Number,
        default: 0
    }
})

const menu = mongoose.model('menu',menuSchema)
module.exports= menu