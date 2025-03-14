


function ErrorHandler(err, req, res, next) {
    if (err.message === 'Not allowed by CORS') {
        console.error('Api hit from wrong IP cors error');
        res.status(403).json({ success: false, message: 'Please visit our official website', data: {} });
    } else {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error', data: {} });
    }
}


module.exports = ErrorHandler;
