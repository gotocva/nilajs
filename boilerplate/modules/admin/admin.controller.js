
const { sendSuccessResponse, sendErrorResponse } = require('../../utils/response.handler');
const Admin = require('./admin.model');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const login = async (req, res) => {

    const admin = await Admin.findOne({email: req.body.email});
    if (admin) {
        const match = await bcrypt.compare(req.body.password, admin.password);
        if (match) {
            return sendSuccessResponse(res, { data: admin });
        } else {
            return sendErrorResponse(res, { message : 'incorrect password' , statusCode: 400 });
        }
    } else {
        
        return sendErrorResponse(res, { message : 'Email not exists' , statusCode: 400 });
    }

}

module.exports = {
    login
}