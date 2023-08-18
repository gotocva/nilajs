
import joi from 'joi';

// Define a schema for a validation object.
const Schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
});


/**
 * @author sivabharathy
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const registerValidator = (req, res, next) => {
    // Validate the data sent in the request body.
    const { error } = Schema.validate(req.body);

    // If the data is valid, save the user to the database.
    if (!error) {
        // Save the user to the database.
        next();
    } else {
        // The data is invalid, send an error message.
        return res.errorResponse(400, error, error);
    }
}