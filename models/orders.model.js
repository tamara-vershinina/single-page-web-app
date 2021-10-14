const mongoose = require('mongoose');

//creating a mongoose schema for an order
const OrderSchema = mongoose.Schema({
    _id: String,
    customer_id: String,
    items: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
