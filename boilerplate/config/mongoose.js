const mongoose = require('mongoose');
const env = require('dotenv').config().parsed;


const connectMongodb = async () => {
    // Connect to MongoDB using mongoose
    mongoose.connect(env.MONGODB_URL, {});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Mongodb connection error:'));
    db.once('open', function () {
        console.log('Connected to MongoDB');
    });
    return db;
}

module.exports = {
    connectMongodb
}