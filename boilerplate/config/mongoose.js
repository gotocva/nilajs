const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/mydatabase';

const options = {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 5000, // Helps prevent memory leaks by failing fast
};

let isConnectedBefore = false;

// Function to establish MongoDB connection with retry logic
function connectDatabase() {
    mongoose.connect(MONGO_URI, options)
        .then(() => {
            isConnectedBefore = true;
            console.log('MongoDB connected successfully');
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err);
            if (!isConnectedBefore) {
                console.log('Retrying connection in 5 seconds...');
                setTimeout(connectDatabase, 5000);
            }
        });
}

// Mongoose connection event handlers
mongoose.connection.on('connected', function () {
    // console.log('Mongoose connected to:', MONGO_URI);
});

mongoose.connection.on('error', function (err) {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', function () {
    if (isConnectedBefore) {
        console.warn('Mongoose disconnected! Reconnecting...');
        connectDatabase();
    }
});

// Graceful shutdown handler
process.on('SIGINT', async function () {
    try {
        await mongoose.connection.close();
        console.log('Mongoose connection closed due to app termination');
        process.exit(0);
    } catch (err) {
        console.error('Error closing Mongoose connection:', err);
        process.exit(1);
    }
});

module.exports = connectDatabase;
