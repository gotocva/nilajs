
const sampleController = `
import * as {CAPSNAME} from "@model/{NAME}.model";

/**
 * @author Nilajs
 * 
 * @created_at ${ new Date() }
 * @param {*} req 
 * @param {*} res 
 */ 
export const create = async (req, res) => {
    
    await {CAPSNAME}._create(req.body)
    .then(({NAME}) => {
        return res.successResponse(200, 'New {NAME} created', {NAME});
    })
    .catch((error) => {
        return res.errorResponse(500,'Exception caught', error);
    })
}

/**
 * @author Nilajs
 * 
 * @created_at ${ new Date() }
 * @param {*} req 
 * @param {*} res 
 */ 
export const list = async (req, res) => {

    await {CAPSNAME}._list(req.body)
    .then(({NAME}) => {
        res.successResponse(200, '{CAPSNAME} list', {NAME});
    })
    .catch((error) => {
        return res.errorResponse(500,'Exception caught', error);
    })
}

/**
 * @author Nilajs
 * 
 * @created_at ${ new Date() }
 * @param {*} req 
 * @param {*} res 
 */ 
export const getOne = async (req, res) => {

    await {CAPSNAME}._getById(req.params.id)
    .then(({NAME}) => {
        if ({NAME}) res.successResponse(200, '{CAPSNAME} details', {NAME});
        else res.errorResponse(400, '{NAME} not found', []);
    })
    .catch((error) => {
        return res.errorResponse(500,'Exception caught', error);
    })
}

/**
 * @author Nilajs
 * 
 * @created_at ${ new Date() }
 * @param {*} req 
 * @param {*} res 
 */ 
export const update = async (req, res) => {

    await {CAPSNAME}._update(req.params.id, req.body)
    .then(({NAME}) => {
        if ({NAME}) res.successResponse(200, '{NAME} details updated', {NAME});
        else res.errorResponse(400, '{NAME} not found', []);
    })
    .catch((error) => {
        return res.errorResponse(500,'Exception caught', error);
    })
}

/**
 * @author Nilajs
 * 
 * @created_at ${ new Date() }
 * @param {*} req 
 * @param {*} res 
 */ 
export const deleteOne = async (req, res) => {

    await {CAPSNAME}._delete(req.params.id)
    .then(({NAME}) => {
        if ({NAME}) res.successResponse(200, '{NAME} deleted', {NAME});
        else res.errorResponse(400, '{NAME} not found', []);
    })
    .catch((error) => {
        return res.errorResponse(500,'Exception caught', error);
    })
}

`;


module.exports = {
    sampleController
}