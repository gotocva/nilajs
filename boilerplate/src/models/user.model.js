
import mongoose from 'mongoose';
import { encrypt } from '@util/encryption';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/**
 * User Schema
 * @created_at Wed Aug 09 2023 17:00:21 GMT+0530 (India Standard Time)
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
    // console.log('%s has been validated (but not saved yet)', doc._id);
    doc.password = encrypt(doc.password);
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
 * @author sivabharathy
 * 
 * @created_at Wed Aug 09 2023 17:00:21 GMT+0530 (India Standard Time)
 * 
 * @param {*} data 
 * @returns 
 */
export const _create = (data) => {
    data.auth_token = encrypt(JSON.stringify(data));
    return new Promise(async (resolve, reject) => {
        try {
            const objUser = new User(data);
            const user = await objUser.save();
            resolve(user);
        } catch (error) {
            reject(error)
        } 
    })
}

/**
 * @author sivabharathy
 * 
 * @created_at Wed Aug 09 2023 17:00:21 GMT+0530 (India Standard Time)
 * @returns 
 */
export const _list = (query = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ignoreColoumns = {
                // auth_token: false
            }
            const user = await User.find(query, ignoreColoumns);
            resolve(user);
        } catch (error) {
            reject(error)
        } 
    })
}

/**
 * @author sivabharathy
 * 
 * @created_at Wed Aug 09 2023 17:00:21 GMT+0530 (India Standard Time)
 * @param {*} _id 
 * @returns 
 */
export const _getById = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({_id: _id});
            resolve(user);
        } catch (error) {
            reject(error)
        } 
    });
}

/**
 * @author sivabharathy
 * 
 * @created_at Wed Aug 09 2023 17:00:21 GMT+0530 (India Standard Time)
 * @param {*} _id 
 * @returns 
 */
export const _get = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne(query);
            resolve(user);
        } catch (error) {
            reject(error)
        } 
    });
}

/**
 * @author sivabharathy
 * 
 * @created_at Wed Aug 09 2023 17:00:21 GMT+0530 (India Standard Time)
 * @param {*} _id 
 * @returns 
 */
export const _update = (_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findByIdAndUpdate(_id, data, { new: true });
            resolve(user);
        } catch (error) {
            reject(error)
        } 
    });
}
/**
 * @author sivabharathy
 * 
 * @created_at Wed Aug 09 2023 17:00:21 GMT+0530 (India Standard Time)
 * @param {*} _id 
 * @returns 
 */
export const _delete = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findByIdAndDelete(_id).exec();
            resolve(user);
        } catch (error) {
            reject(error)
        } 
    });
}