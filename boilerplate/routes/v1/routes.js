

const express = require('express');


const apiBasic = (req, res) => {
    res.send('API v1.0.0 is working...');
}

const Router = express.Router();

/**
 * V1 common routes
 * @description Version 1.0.0 API routes
 */

// default routes
Router.get('/', apiBasic);

// User routes 
const userController = require('../../controllers/user.controller');

// Authentication Routes
Router.post('/register', userController.register);
Router.post('/login', userController.login);

// User CRUD Routes
Router.get('/users', userController.getAllUsers);
Router.get('/users/:id', userController.getUserById);
Router.put('/users/:id', userController.updateUser);
Router.delete('/users/:id', userController.deleteUser);


module.exports = Router;
