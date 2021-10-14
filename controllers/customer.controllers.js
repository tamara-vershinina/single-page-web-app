const mongoose = require('mongoose');
const Customer = require('../models/customers.model.js');
const Order = require('../models/orders.model.js');

// Default message for / (get)
exports.root = (req, res) => {
    Customer.find()
    .then(customers => {
        res.render('customers_view', {
            results: customers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error"
        });
    });
};

//Create a new Customer and save to the database
exports.create = (req, res) => {
    const customer = new Customer({
            _id: req.body._id,
            title: req.body.title,
            firstName: req.body.firstName,
            surname: req.body.surname,
            mobile: req.body.mobile,
            email: req.body.email,
            home_address: req.body.home_address,
            shipping_address: req.body.shipping_address
    });
    customer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({   //server error
            message: err.message || "Error"
        });
    });
};

//Return all Customers in the database
exports.findAll = (req, res) => {
    Customer.find()
    .then(customers => {
        res.send(JSON.stringify(customers, null, 2));
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error"
        });
    });
};

//Find a single Customer specified by _id
exports.findOne = (req, res) => {
    Customer.findById(req.params._id)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params._id
            });
        }
        res.send(JSON.stringify(customer, null, 2));
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error retrieving Customer with id " + req.params._id
        });
    });
};

//Update a Customer identified by _id
exports.update = (req, res) => {
    console.log(req.body);
    //Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Customer content cannot be empty"
        });
    }
    var data = req.body;
    if (data.title == null) { delete data.title; }
    if (data.firstName == null) { delete data.firstName; }
    if (data.surname == null) { delete data.surname; }
    if (data.mobile == null) { delete data.mobile; }
    if (data.email == null) { delete data.email; }
    if (data.home_address != null) {
        if (data.home_address.address_line_1 == null) { delete data.home_address.address_line_1; }
        if (data.home_address.address_line_2 == null) { delete data.home_address.address_line_2; }
        if (data.home_address.town == null) { delete data.home_address.town; }
        if (data.home_address.county == null) { delete data.home_address.county; }
        if (data.home_address.eircode == null) { delete data.home_address.eircode; }
    }
    if (data.shipping_address != null) {
        if (data.shipping_address.address_line_1 == null) { delete data.home_address.address_line_1; }
        if (data.shipping_address.address_line_2 == null) { delete data.home_address.address_line_2; }
        if (data.shipping_address.town == null) { delete data.home_address.town; }
        if (data.shipping_address.county == null) { delete data.home_address.county; }
        if (data.shipping_address.eircode == null) { delete data.home_address.eircode; }
    }
    console.log(data);
    Customer.findByIdAndUpdate(req.params._id, data, {new : true})
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params._id
            });
        }
        res.send(JSON.stringify(customer, null, 2));
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params._id
            });
        }
        console.error(err);
        return res.status(500).send({
            message: "Error updating Customer with id " + req.params._id
        });
    });
};

//Delete a Customer identified by _id
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params._id)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params._id
            });
        }
        Order.deleteMany({ customer_id: req.params._id })
        .then(orders => {
            res.send({message: "Customer and customer's orders deleted"});
        }).catch(err => {
            res.send({message: "Customer deleted"});
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Could not delete Customer with id " + req.params._id
        });
    });
};







