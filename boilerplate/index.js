// package imports
const env = require('dotenv').config().parsed;

// local imports 
const { connectMongodb } = require('./config/mongoose');

const { app } = require('./app');
const { initCron } = require('./cron');

// Connect to MongoDB using mongoose
connectMongodb();

//init cron jobs 
initCron();

// Start the express server
// TODO : implement http and https server 
app.listen(env.PORT, async () => {
    console.log(`Application is running on http://localhost:${env.PORT}`);
});

