const express = require('express');

const router = express.Router();

const adminController = require('./admin.controller');

// Admin module api's

router.post('/login', [], adminController.login);


module.exports = router;