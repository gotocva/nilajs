
import * as User from "@model/user.model";

/**
 * @author sivabharathy
 * 
 * @created_at Wed Aug 09 2023 17:00:21 GMT+0530 (India Standard Time)
 * @param {*} req 
 * @param {*} res 
 */ 
export const create = async (req, res) => {
    
    await User._create(req.body)
    .then((user) => {
        return res.successResponse(200, 'New user created', user);
    })
    .catch((error) => {
        return res.errorResponse(500,'Exception caught', error);
    })
}

/**
 * @author sivabharathy
 * 
 * @created_at Wed Aug 09 2023 17:00:21 GMT+0530 (India Standard Time)
 * @param {*} req 
 * @param {*} res 
 */ 
export const list = async (req, res) => {

    await User._list(req.body)
    .then((user) => {
        res.successResponse(200, 'User list', user);
    })
    .catch((error) => {
        return res.errorResponse(500,'Exception caught', error);
    })
}

/**
 * @author sivabharathy
 * 
 * @created_at Wed Aug 09 2023 17:00:21 GMT+0530 (India Standard Time)
 * @param {*} req 
 * @param {*} res 
 */ 
export const getOne = async (req, res) => {

    await User._getById(req.params.id)
    .then((user) => {
        if (user) res.successResponse(200, 'User details', user);
        else res.errorResponse(400, 'user not found', []);
    })
    .catch((error) => {
        return res.errorResponse(500,'Exception caught', error);
    })
}

/**
 * @author sivabharathy
 * 
 * @created_at Wed Aug 09 2023 17:00:21 GMT+0530 (India Standard Time)
 * @param {*} req 
 * @param {*} res 
 */ 
export const update = async (req, res) => {

    await User._update(req.params.id, req.body)
    .then((user) => {
        if (user) res.successResponse(200, 'user details updated', user);
        else res.errorResponse(400, 'user not found', []);
    })
    .catch((error) => {
        return res.errorResponse(500,'Exception caught', error);
    })
}

/**
 * @author sivabharathy
 * 
 * @created_at Wed Aug 09 2023 17:00:21 GMT+0530 (India Standard Time)
 * @param {*} req 
 * @param {*} res 
 */ 
export const deleteOne = async (req, res) => {

    await User._delete(req.params.id)
    .then((user) => {
        if (user) res.successResponse(200, 'user deleted', user);
        else res.errorResponse(400, 'user not found', []);
    })
    .catch((error) => {
        return res.errorResponse(500,'Exception caught', error);
    })
}

