
import mongoose from 'mongoose';
import { encrypt } from '@util/encryption';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/**
 * User Schema
 * @description User model
 */
const schema = new Schema({

    name: {
        type: String,
        required: [true, 'name must not be empty'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email must not be empty'],
    },
    phone_number: {
        type: String,
    },
    auth_token: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password must not be empty'],
    },
    status: {
        type: Boolean,
        default: true
    },
}, { timestamps: false, versionKey: false });

schema.post('init', function(doc) {
    // it is called while accessing the data from DB example: find()
    // console.log('%s has been initialized from the db', doc._id);
});

schema.post('validate', function(doc) {
    // This middleware is called while inserting records 1st
    doc.password = encrypt(doc.password);
    // console.log('%s has been validated (but not saved yet)', doc._id);
});

schema.pre('save', () => {
    // This middleware is called while inserting records 2nd
    // console.log('Hello from pre save')
});

schema.post('save', function(doc) {
    // This middleware is called while inserting records 3rd
    // console.log('%s has been saved', doc._id);
});

schema.post('remove', function(doc) {
    // console.log('%s has been removed', doc._id);
});

export const User = mongoose.model('User', schema);

/**
 * 
 * @param {*} data 
 * @returns 
 */
export const store = (data) => {
    data.auth_token = encrypt(JSON.stringify(data));
    return new Promise(async (resolve, reject) => {
        const obj = new User(data);
        const user = await obj.save();
        resolve(user);
    })
}

/**
 * 
 * @returns 
 */
export const list = () => {
    return new Promise(async (resolve, reject) => {
        const user = await User.find({}, {auth_token: false, password: false});
        resolve(user);
    })
}

/**
 * 
 * @param {*} email 
 * @returns 
 */
export const getByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({email: email});
        resolve(user);
    })
}