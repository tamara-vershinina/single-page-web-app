module.exports = (app) => {
    const customers = require('../controllers/customer.controllers.js');

    app.get('/', customers.root);

    //Create a new customer:
    app.post('/customers', customers.create);

    //Retrieve all customers
    app.get('/customers', customers.findAll);

    //Retrieve one customer by _id
    app.get('/customers/:_id', customers.findOne);

    //Update a single customer specified by _id
    app.put('/customers/:_id', customers.update);

    //Delete a customer specified by _id
    app.delete('/customers/:_id', customers.delete);

};
