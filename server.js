//Browser used to test: Brave
//Operating System: MacOs

//This code is a class assignment that elaborates on
//example code provided by the lecturer J.Keating

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const hbs = require('hbs');
const path = require('path');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use('/assets', express.static(__dirname + '/public'));

require('./routes/customer.routes.js')(app);
require('./routes/item.routes.js')(app);
require('./routes/order.routes.js')(app);

//listening for requests on port 3000
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

//setting up mongoose and the database connection
const dbConnect = require('./config/connect.js');
const mongoose = require('mongoose');

//setting connection to the database
mongoose.connect(dbConnect.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the MongoDB database");
}).catch(err => {
    console.log('Unable to connect to the MongoDB database', err);
    process.exit();
});
