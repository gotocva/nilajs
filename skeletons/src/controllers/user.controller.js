import * as User from "@model/user.model";
import { decrypt } from "@util/encryption";

/**
 * @author sivabharathy
 * 
 * @param {*} req 
 * @param {*} res 
 */ 
export const loginUser = async (req, res) => {

    await User.getByEmail(req.body.email)
    .then((user) => {
        if (user) {
            if (decrypt(user.password) == req.body.password) {
                return res.successResponse(200, 'Logged in successfully', user);
            } else {
                return res.errorResponse(401, 'Invalid password', {});
            }
        } else {
            return res.errorResponse(401, 'Email id not exist', {});
        }
    })
    .catch((error) => {
        console.log({error});
        return res.errorResponse(500,'Exception caught', error);
    });
}

/**
 * @author sivabharathy
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const storeUser = async (req, res) => {

    await User.store(req.body)
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
 * @param {*} req 
 * @param {*} res 
 */
export const getAllUsers = async (req, res) => {

    await User.list(req.body)
    .then((user) => {
        res.successResponse(200, 'Users list', user);
    })
    .catch((error) => {
        return res.errorResponse(500,'Exception caught', error);
    })
}
