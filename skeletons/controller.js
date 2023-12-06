
const sampleController = `
const { sendSuccessResponse, sendErrorResponse } = require("../../utils/response.handler");
const Log = require('../../utils/logs');
const {CAPSNAME} = require('./{NAME}.model');

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const store = async (req, res) => {
    try {
        const {NAME} = await {CAPSNAME}.create(req.body)
        if ({NAME}) {
            return sendSuccessResponse(res, { data: {NAME}, message: "{CAPSNAME} created Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: {NAME}, message: "Unable to create {CAPSNAME}", statusCode: 400 });
        }
    } catch (error) {
        Log.error('Error:', error);
        return sendErrorResponse(res, { error: error });
    }
}

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const get = async (req, res) => {
    try {
        const {NAME} = await {CAPSNAME}.findById(req.params.id);
        if ({NAME}) {
            return sendSuccessResponse(res, { data: {NAME}, message: "{CAPSNAME} details retrieved Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: {NAME}, message: "{CAPSNAME} not found", statusCode: 400 });
        }
    } catch (error) {
        Log.error('Error:', error);
        sendErrorResponse(res, { error: error });
    }
}

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const list = async (req, res) => {
    try {
        if (req.query.select) {
            req.query.select = req.query.select.replace(',', ' '); 
        }
        const {NAME} = await {CAPSNAME}.paginate({},req.query);
        return sendSuccessResponse(res, { data: {NAME}, message: "{CAPSNAME} list retrieved Successfully", statusCode: 200 });
    } catch (error) {
        Log.error('Error:', error);
        sendErrorResponse(res, { error: error });
    }
}

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const remove = async (req, res) => {
    try {
        const {NAME} = await {CAPSNAME}.findByIdAndDelete(req.params.id)
        if ({NAME}) {
            return sendSuccessResponse(res, { data: {NAME}, message: "{CAPSNAME} details deleted Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: {NAME}, message: "Failed to delete {NAME}", statusCode: 400 });
        }
    } catch (error) {
        Log.error('Error:', error);
        return sendErrorResponse(res, { error: error });
    }
}

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const update = async (req, res) => {
    try {
        const {NAME} = await {CAPSNAME}.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if ({NAME}) {
            return sendSuccessResponse(res, { data: {NAME}, message: "{CAPSNAME} details updated Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: {NAME}, message: "Failed to update {NAME} details", statusCode: 400 });
        }
    } catch (error) {
        Log.error('Error:', error);
        sendErrorResponse(res, { error: error });
    }
}


module.exports = {
    store,
    get,
    list,
    remove,
    update
}
`;


module.exports = {
    sampleController
}