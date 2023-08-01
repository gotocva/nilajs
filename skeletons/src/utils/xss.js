import xss from 'xss';

/**
 * @author sivabharathy
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const xssPrevention = (req, res, next) => {
    // Sanitize req.body
    if (req.body) {
        sanitize(req.body);
    }
    // Sanitize req.query
    if (req.query) {
        sanitize(req.query);
    }
    next();
}

/**
 * @author sivabharathy
 * 
 * Sanitize function using xss library
 * @param {*} data 
 */
const sanitize = (data) => {
    for (const key in data) {
      if (typeof data[key] === 'string') {
        data[key] = xss(data[key]);
      } else if (typeof data[key] === 'object') {
        sanitize(data[key]);
      }
    }
}