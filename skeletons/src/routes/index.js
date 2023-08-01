
import userRouter from './user.routes';

/**
 * @author sivabharathy
 * 
 * @param {*} app 
 * @returns 
 */
export const routeLoader = (app) => {


    app.get('/api', (req, res) => { res.send('api routes working'); });

    app.use('/api', userRouter);

    app.get('*', function(req, res){
        return res.errorResponse(404, 'Route not found', {});
    });

    // This middleware should be defined after all other route and middleware definitions.
    app.use((err, req, res, next) => {
        // TODO Log the error into database for future debugging

        // Set the status code based on the error
        const statusCode = err.statusCode || 500;
    
        // Set the error message to send in the response
        const errorMessage = err.message || 'Internal Server Error';
    
        // Send the error response
        return res.status(statusCode).json({
            status: false,
            status_code: statusCode,
            message: errorMessage,
            data: {}
        });
    });

    return app;
}