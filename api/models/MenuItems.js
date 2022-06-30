const mongoose = require('mongoose');
// using mongoose lib.

const Schema = mongoose.Schema;
// it has schema function

const MenuItemsSchema = new Schema({
    text: {
    type: String,
    required: true
    },
    complete: {
    type: Boolean,
    default: false
    },
    timestamp: {
    type: String,
    default: Date.now()
    }
})  
const MenuItems = mongoose.model('MenuItems', MenuItemsSchema)

module.exports = MenuItems