const mongodb = require('mongodb');
const db = {};
const client = new mongodb.MongoClient('mongodb://localhost:27017');
client.connect().then((connectedClient)=>{
    console.log('connected to mongodb');
    const database = connectedClient.db('Tinder');
    db.users = database.collection('users');
})
module.exports = db;