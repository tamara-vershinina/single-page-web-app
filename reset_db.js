const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://user:w7e3xobGULlPZskqrv6g@cluster0.mnqmd.mongodb.net/database?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function resetDb() {
    // Wait for client to connect to MongoDB
    await client.connect();

    // Connect to the database named "database"
    const db = client.db("database")

    await createCustomers(db.collection("customers"));
    await createItems(db.collection("items"));
    await createOrders(db.collection("orders"));
    client.close();
}
module.exports = resetDb;

// Uncomment to run this file with "node reset_db.js" to reset the database
resetDb().catch(console.dir);

async function createCustomers(customers) {
    // Remove existing records.
    await customers.deleteMany();

    const customerRecords = [
        {
            _id: "C11111111111111111111111",
            title: "Mr.",
            firstName: "John",
            surname: "Doe",
            mobile: "123-456-7890",
            email: "abc@def.ghi",
            home_address: {
                address_line_1: "123 Kitten Lane",
                address_line_2: "Meowvilla",
                town: "Maynooth",
                county: "Kildare",
                eircode: "A1 B2"
            },
            shipping_address: {
                address_line_1: "123 Kitten Lane",
                address_line_2: "Meowvilla",
                town: "Maynooth",
                county: "Kildare",
                eircode: "A1 B2"
            }
        },
        {
            _id: "C22222222222222222222222",
            title: "Ms.",
            firstName: "Jane",
            surname: "Dolphin",
            mobile: "155-200-7859",
            email: "ghi@jkl.ghi",
            home_address: {
                address_line_1: "123 Dolphin Lane",
                address_line_2: "Eeeevilla",
                town: "Maynooth",
                county: "Kildare",
                eircode: "A1 B3"
            },
            shipping_address: {
                address_line_1: "123 Dolphin Lane",
                address_line_2: "Eeeevilla",
                town: "Maynooth",
                county: "Kildare",
                eircode: "A1 B3"
            }
        },
        {
            _id: "C33333333333333333333333",
            title: "Mrs.",
            firstName: "Alice",
            surname: "King",
            mobile: "122-290-1234",
            email: "mno@pqr.ghi",
            home_address: {
                address_line_1: "445 Green Lane",
                address_line_2: "Mariavilla",
                town: "Maynooth",
                county: "Kildare",
                eircode: "A1 B0"
            },
            shipping_address: {
                address_line_1: "445 Green Lane",
                address_line_2: "Mariavilla",
                town: "Maynooth",
                county: "Kildare",
                eircode: "A1 B0"
            }
        },
        {
            _id: "C44444444444444444444444",
            title: "Mrs.",
            firstName: "Elizabeth",
            surname: "Brown",
            mobile: "345-200-8374",
            email: "lkj@poi.ghi",
            home_address: {
                address_line_1: "365 Rose Lane",
                address_line_2: "Rosevilla",
                town: "Maynooth",
                county: "Kildare",
                eircode: "A3 B3"
            },
            shipping_address: {
                address_line_1: "365 Rose Lane",
                address_line_2: "Rosevilla",
                town: "Maynooth",
                county: "Kildare",
                eircode: "A3 B3"
            }
        },
        {
            _id: "C55555555555555555555555",
            title: "Dr.",
            firstName: "William",
            surname: "Black",
            mobile: "736-948-4993",
            email: "vbn@zxc.ghi",
            home_address: {
                address_line_1: "32 Black Lane",
                address_line_2: "Blackvilla",
                town: "Maynooth",
                county: "Kildare",
                eircode: "A5 B4"
            },
            shipping_address: {
                address_line_1: "32 Green Lane",
                address_line_2: "Blackvilla",
                town: "Maynooth",
                county: "Kildare",
                eircode: "A5 B4"
            }
        }
    ];
    // Insert array of customer records into the collection
    const result = await customers.insertMany(customerRecords);

    // Ensure that the number of inserted records is the same as the number of desired records
    assert.equal(customerRecords.length, result.insertedCount);
}

async function createItems(items) {
    // Remove existing records.
    await items.deleteMany();

    const itemRecords = [
        {
            _id: "I11111111111111111111111",
            manufacturer: "Apple",
            model: "iPhone 50",
            price: 5000
        },
        {
            _id: "I22222222222222222222222",
            manufacturer: "Watermelon",
            model: "uPhone 33",
            price: 6000
        },
        {
            _id: "I33333333333333333333333",
            manufacturer: "Blueberry",
            model: "bPhone 1",
            price: 1000
        },
        {
            _id: "I44444444444444444444444",
            manufacturer: "Snowflakes",
            model: "sPhone 700",
            price: 570
        },
        {
            _id: "I55555555555555555555555",
            manufacturer: "Pineapple",
            model: "pPhone 1246",
            price: 3300
        }
    ];
    const result = await items.insertMany(itemRecords);
    assert.equal(itemRecords.length, result.insertedCount);
}

async function createOrders(orders) {
    // Remove existing records.
    await orders.deleteMany();

    const ordersRecords = [
        {
            _id: "O11111111111111111111111",
            customer_id: "C11111111111111111111111",
            items: ["I11111111111111111111111"]
        },
        {
            _id: "O22222222222222222222222",
            customer_id: "C22222222222222222222222",
            items: ["I11111111111111111111111", "I22222222222222222222222"]
        },
        {
            _id: "O33333333333333333333333",
            customer_id: "C33333333333333333333333",
            items: ["I22222222222222222222222"]
        },
        {
            _id: "O44444444444444444444444",
            customer_id: "C44444444444444444444444",
            items: ["I44444444444444444444444"]
        },
        {
            _id: "O55555555555555555555555",
            customer_id: "C55555555555555555555555",
            items: ["I55555555555555555555555"]
        }
    ];
    const result = await orders.insertMany(ordersRecords);
    assert.equal(ordersRecords.length, result.insertedCount);
}
