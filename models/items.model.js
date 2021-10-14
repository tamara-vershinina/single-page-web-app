const mongoose = require('mongoose');

//creating a mongoose schema for an item
const ItemSchema = mongoose.Schema({
    _id: String,
    manufacturer: String,
    model: String,
    price: Number
}, {
    timestamps: true
});

//exporting the model to the app
module.exports = mongoose.model('Item', ItemSchema);


