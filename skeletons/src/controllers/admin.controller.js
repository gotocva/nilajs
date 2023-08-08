
import * as Admin from "@model/{Name}.model";

/**
 * @author sivabharathy
 * 
 * @created_at Tue Aug 08 2023 21:44:57 GMT+0530 (India Standard Time)
 * @param {*} req 
 * @param {*} res 
 */ 
export const store = async (req, res) => {
    await Admin.store(req.body)
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
 * @created_at Tue Aug 08 2023 21:44:57 GMT+0530 (India Standard Time)
 * @param {*} req 
 * @param {*} res 
 */ 
export const list = async (req, res) => {
    await Admin.list(req.body)
    .then((user) => {
        res.successResponse(200, 'Users list', user);
    })
    .catch((error) => {
        return res.errorResponse(500,'Exception caught', error);
    })
}

/**
 * @author sivabharathy
 * 
 * @created_at Tue Aug 08 2023 21:44:57 GMT+0530 (India Standard Time)
 * @param {*} req 
 * @param {*} res 
 */ 
export const getOne = async (req, res) => {

    await Admin.getById(req.params.id)
    .then((user) => {
        if (user) res.successResponse(200, 'User details', user);
        else res.errorResponse(400, 'User not found', []);
    })
    .catch((error) => {
        return res.errorResponse(500,'Exception caught', error);
    })
}

/**
 * @author sivabharathy
 * 
 * @created_at Tue Aug 08 2023 21:44:57 GMT+0530 (India Standard Time)
 * @param {*} req 
 * @param {*} res 
 */ 
export const update = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await Admin.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
        if (!user) return res.successResponse(400, 'User not found', user);
        return res.successResponse(200, 'User details updated successfully', user);
    } catch (error) {
        return res.errorResponse(500,'Exception caught', error);
    }
}

/**
 * @author sivabharathy
 * 
 * @created_at Tue Aug 08 2023 21:44:57 GMT+0530 (India Standard Time)
 * @param {*} req 
 * @param {*} res 
 */ 
export const deleteOne = async (req, res) => {
    try {
        const user = await Admin.findByIdAndDelete(req.params.id).exec()
        if (!user) return res.errorResponse(400, 'User not found', user);
        return res.successResponse(200, 'User deleted successfully', user);
    } catch (error) {
        console.error("Error storing user:", error);
        return res.errorResponse(500,'Exception caught', error);
    }
}

