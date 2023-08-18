/**
 * @author sivabharathy
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const authCheck = (req, res, next) => {
    if (req.headers.authorization) {
        // TODO : check the token on database
        next();
    } else {
        return res.errorResponse(421, 'Authentication required')
    }
}