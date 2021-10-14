module.exports = (app) => {
    const items = require('../controllers/item.controllers.js');

    //Show items page
    app.get('/show-items', items.showItems);

    //Create a new item:
    app.post('/items', items.create);

    //Retrieve all items
    app.get('/items', items.findAll);

    //Retrieve one item by _id
    app.get('/items/:_id', items.findOne);

    //Update a single item specified by _id
    app.put('/items/:_id', items.update);

    //Delete an item specified by _id
    app.delete('/items/:_id', items.delete);
};
