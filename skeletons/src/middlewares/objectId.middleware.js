import mongoose from "mongoose";
/**
 * @author sivabharathy
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const checkObjectId = (req, res, next) => {

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        next();
    } else {
        return res.errorResponse(400, 'Invalid id parameter')
    }
}