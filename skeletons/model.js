
const sampleModel = `
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/**
 * {CAPSNAME} Schema
 * @created_at ${ new Date() }
 * @description {CAPSNAME} model
 */
const schema = new Schema({

    name: {
        type: String,
        required: [true, 'name must not be empty'],
    },
}, { timestamps: false, versionKey: false });

schema.post('init', function(doc) {
    // it is called while accessing the data from DB example: find()
    // console.log('%s has been initialized from the db', doc._id);
});

schema.post('validate', function(doc) {
    // This middleware is called while inserting records 1st
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

schema.methods._list = function(query = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            const ignoreColoumns = {
                // auth_token: false
            }
            const {NAME} = await {CAPSNAME}.find(query, ignoreColoumns);
            resolve({NAME});
        } catch (error) {
            reject(error)
        } 
    });
}

export const {CAPSNAME} = mongoose.model('{CAPSNAME}', schema);

/**
 * @author Nilajs
 * 
 * @created_at ${ new Date() }
 * 
 * @param {*} data 
 * @returns 
 */
export const _create = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const obj{CAPSNAME} = new {CAPSNAME}(data);
            const {NAME} = await obj{CAPSNAME}.save();
            resolve({NAME});
        } catch (error) {
            reject(error)
        } 
    })
}

/**
 * @author Nilajs
 * 
 * @created_at ${ new Date() }
 * @returns 
 */
export const _list = (query = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ignoreColoumns = {
                // auth_token: false
            }
            const {NAME} = await {CAPSNAME}.find(query, ignoreColoumns);
            resolve({NAME});
        } catch (error) {
            reject(error)
        } 
    })
}

/**
 * @author Nilajs
 * 
 * @created_at ${ new Date() }
 * @param {*} _id 
 * @returns 
 */
export const _getById = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {NAME} = await {CAPSNAME}.findOne({_id: _id});
            resolve({NAME});
        } catch (error) {
            reject(error)
        } 
    });
}

/**
 * @author Nilajs
 * 
 * @created_at ${ new Date() }
 * @param {*} _id 
 * @returns 
 */
export const _get = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {NAME} = await {CAPSNAME}.findOne(query);
            resolve({NAME});
        } catch (error) {
            reject(error)
        } 
    });
}

/**
 * @author Nilajs
 * 
 * @created_at ${ new Date() }
 * @param {*} _id 
 * @returns 
 */
export const _update = (_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {NAME} = await {CAPSNAME}.findByIdAndUpdate(_id, data, { new: true });
            resolve({NAME});
        } catch (error) {
            reject(error)
        } 
    });
}
/**
 * @author Nilajs
 * 
 * @created_at ${ new Date() }
 * @param {*} _id 
 * @returns 
 */
export const _delete = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {NAME} = await {CAPSNAME}.findByIdAndDelete(_id).exec();
            resolve({NAME});
        } catch (error) {
            reject(error)
        } 
    });
}`



module.exports = {
    sampleModel
}