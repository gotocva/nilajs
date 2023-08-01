

import mongoose from 'mongoose';
import { dbConfig } from '@config/db.config';
import { LOG } from '@log/index';

/**
 * @author sivabharathy
 * 
 * connect to mongodb 
 */
export const connectDB = () => {

    mongoose.connect(dbConfig.MONGODB_URI, dbConfig.CONNECTION_OPTIONS);
    
    // when successfully connected
    mongoose.connection.on('connected', () => {
        LOG.info('Mongodb successfully connected');
    });

    // if the connection throws an error
    mongoose.connection.on("error", (err) => {
        // if you get error for the first time when this gets started make sure to run mongodb
        LOG.info('Mongodb connection failed', err);
    });
    
    // when the connection is disconnected
    mongoose.connection.on("disconnected", () => {
        LOG.error('Mongodb disconnected');
    });

    return mongoose.connection;
}