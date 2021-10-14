const mongoose = require('mongoose');
const Order = require('../models/orders.model.js');

// Show orders page on /show-orders
exports.showOrders = (req, res) => {
    Order.find()
    .then(orders => {
        res.render('orders_view', {
            results: orders
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error"
        });
    });
};

//Create a new Order and save to the database
exports.create = (req, res) => {
    const order = new Order({
            _id: req.body._id,
            customer_id: req.body.customer_id,
            items: req.body.items
    });
    order.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({   //server error
            message: err.message || "Error"
        });
    });
};

//Return all Orders in the database
exports.findAll = (req, res) => {
    Order.find()
    .then(orders => {
        res.send(JSON.stringify(orders, null, 2));
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error"
        });
    });
};

//Find a single Order specified by _id
exports.findOne = (req, res) => {
    Order.findById(req.params._id)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params._id
            });
        }
        res.send(JSON.stringify(order, null, 2));
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error retrieving Order with id " + req.params._id
        });
    });
};

//Update an Order identified by _id
exports.update = (req, res) => {
    console.log(req.body);
    //Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Order content cannot be empty"
        });
    }
    Order.findByIdAndUpdate(req.params._id, {
            customer_id: req.body.customer_id,
            items: req.body.items
    }, {new : true})
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params._id
            });
        }
        res.send(JSON.stringify(order, null, 2));
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating Order with id " + req.params._id
        });
    });
};

//Delete an Order identified by _id
exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.params._id)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params._id
            });
        }
        res.send({message: "Order deleted"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Could not delete Order with id " + req.params._id
        });
    });
};
