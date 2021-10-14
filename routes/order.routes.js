module.exports = (app) => {
    const orders = require('../controllers/order.controllers.js');

    //Show orders page
    app.get('/show-orders', orders.showOrders);

    //Create a new order:
    app.post('/orders', orders.create);

    //Retrieve all orders
    app.get('/orders', orders.findAll);

    //Retrieve one order by _id
    app.get('/orders/:_id', orders.findOne);

    //Update a single order specified by _id
    app.put('/orders/:_id', orders.update);

    //Delete an order specified by _id
    app.delete('/orders/:_id', orders.delete);
};
