

import mongoose from 'mongoose';
import { dbConfig } from '@config/db.config';

/**
 * @author sivabharathy
 * 
 * connect to mongodb 
 */
export const connectDB = () => {

    mongoose.connect(dbConfig.MONGODB_URI, dbConfig.CONNECTION_OPTIONS);
    
    // when successfully connected
    mongoose.connection.on('connected', () => {
        console.log('Mongodb successfully connected');
    });

    // if the connection throws an error
    mongoose.connection.on("error", (err) => {
        // if you get error for the first time when this gets started make sure to run mongodb
        console.log('Mongodb connection failed', err);
    });
    
    // when the connection is disconnected
    mongoose.connection.on("disconnected", () => {
        console.log('Mongodb disconnected');
    });

    return mongoose.connection;
}