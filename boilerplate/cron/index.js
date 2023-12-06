
const cron = require('node-cron');
const Log = require('../utils/logs');


const initCron = async () => {
    Log.info('Cron Task is running!');
}


module.exports = {
    initCron
}