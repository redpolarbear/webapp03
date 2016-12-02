'use strict';

var express = require('express');
var router = express.Router();

var db = require('../db');
var usersController = require('../controllers/usersController');
var middleware = require('../controllers/middleware')(db);

router.post('/', usersController.createUser);
router.post('/login', usersController.loginUser);
router.delete('/login', middleware.requireAuthentication, usersController.logoutUser);

module.exports = router;