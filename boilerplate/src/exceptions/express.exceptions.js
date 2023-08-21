import { LOG } from "@log/index";



/**
 * 
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const expressExceptionHandler = (err, req, res, next) => {

    LOG.error(err.message || "Internal Server Error", err);
    // Set the status code based on the error
    const statusCode = err.statusCode || 500

    // Set the error message to send in the response
    const errorMessage = err.message || "Internal Server Error";

    // Send the error response
    return res.status(statusCode).json({
      status: false,
      status_code: statusCode,
      message: errorMessage,
      data: {},
    });
}