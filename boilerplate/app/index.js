const express = require('express');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const env = require('dotenv').config().parsed;
const basicAuth = require('express-basic-auth');

const loadSwaggerDocs = require('../swagger');

const app = express();

// TODO CORS restriction
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());
// Middleware to handle form-urlencoded data
app.use(express.urlencoded({ extended: true }));

const auth = basicAuth({
    users: { [env.SWAGGER_USERNAME || 'admin']: env.SWAGGER_PASSWORD || 'admin' },
    challenge: true,
    realm: 'Restricted Area',
});

/**
 * Swagger configuration
 */
const swaggerInit = async () => {
    const specs = await loadSwaggerDocs();
    app.use('/api/docs', auth, swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
}
swaggerInit();

// import module routes 
const adminRouter = require('../modules/admin/admin.routes');

app.use('/v1/admin',adminRouter);

module.exports = {
    app
}