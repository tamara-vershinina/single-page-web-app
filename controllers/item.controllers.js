const mongoose = require('mongoose');
const Item = require('../models/items.model.js');

// Show items page on /show-items
exports.showItems = (req, res) => {
    Item.find()
    .then(items => {
        res.render('items_view', {
            results: items
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error."
        });
    });
};

//Create a new Item and save to the database
exports.create = (req, res) => {
    const item = new Item({
            _id: req.body._id,
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            price: req.body.price
    });
    item.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({   //server error
            message: err.message || "Error."
        });
    });
};

//Return all Items in the database
exports.findAll = (req, res) => {
    Item.find()
    .then(items => {
        res.send(JSON.stringify(items, null, 2));
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error."
        });
    });
};

//Find a single Item specified by _id
exports.findOne = (req, res) => {
    Item.findById(req.params._id)
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Item not found with id " + req.params._id
            });
        }
        res.send(JSON.stringify(item, null, 2));
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error retrieving Item with id " + req.params._id
        });
    });
};

//Update an Item identified by _id
exports.update = (req, res) => {
    console.log(req.body);
    //Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Item content cannot be empty"
        });
    }
    var data = {
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            price: req.body.price
    };
    if (data.manufacturer == null) { delete data.manufacturer; }
    if (data.model == null) { delete data.model; }
    if (data.price == null) { delete data.price; }
    Item.findByIdAndUpdate(req.params._id, data, {new : true})
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Item not found with id " + req.params._id
            });
        }
        res.send(JSON.stringify(item, null, 2));
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + req.params._id
            });
        }
        console.error(err);
        return res.status(500).send({
            message: "Error updating Item with id " + req.params._id
        });
    });
};

//Delete an Item identified by _id
exports.delete = (req, res) => {
    Item.findByIdAndRemove(req.params._id)
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Item not found with id " + req.params._id
            });
        }
        res.send({message: "Item deleted"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Item not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Could not delete Item with id " + req.params._id
        });
    });
};

