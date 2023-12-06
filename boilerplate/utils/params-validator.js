const Joi =require("joi");
const { sendValidationError } = require("./response.handler");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const paramsValidator = (req, res, next) => {
    Joi.objectId = require('joi-objectid')(Joi);
    const schema = Joi.objectId().required().error(new Error("Please provide a proper id"));
    const { error } = schema.validate(req.params.id);
    if (!error) {
        next();
    } else {
        return sendValidationError(res, { message: error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') });
    }
}

module.exports={
    paramsValidator
}
