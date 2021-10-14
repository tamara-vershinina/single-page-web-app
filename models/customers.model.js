const mongoose = require('mongoose');

//creating a mongoose schema for a customer
const CustomerSchema = mongoose.Schema({
            _id: String,
            title: String,
            firstName: String,
            surname: String,
            mobile: String,
            email: String,
            home_address: {
                address_line_1: String,
                address_line_2: String,
                town: String,
                county: String,
                eircode: String
            },
            shipping_address: {
                address_line_1: String,
                address_line_2: String,
                town: String,
                county: String,
                eircode: String
            }
}, {
    timestamps: true
});

//exporting the model to the app
module.exports = mongoose.model('Customer', CustomerSchema);
