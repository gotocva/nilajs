import { storeCache } from "@cache/index";

/**
 * @author sivabharathy
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const responseHandler = (req, res, next) => {
    const path = req.path;
    // Create a custom sendResponse function to handle response formatting
    res.successResponse = function (statusCode,message, data, options = {}) {
      const response = {
        status: true,
        message: message,
        status_code: statusCode,
        data: data,
      };
      if (options.cache && options.cache == true) {
        storeCache(path, JSON.stringify(response))
      }
      return res.status(statusCode).json(response);
    };
    // Error handling middleware
    res.errorResponse = function (statusCode, message, err = {}) {

      if ('name' in err && err.name == 'ValidationError') {
        const response = {
          status: false,
          message: err.message,
          status_code: 400,
          data: err,
        };
        return res.status(400).json(response);
      } else {
          const response = {
            status: false,
            message: message,
            status_code: statusCode,
            data: err,
          };
          return res.status(statusCode).json(response);
      }
    };
    next();
}