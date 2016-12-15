'use strict';

var express = require('express');
var router = express.Router();

var db = require('../db');
var foodsController = require('../controllers/foodsController');
var middleware = require('../controllers/middleware')(db);

router.use(middleware.requireAuthentication);
router.post('/', foodsController.createFood);
router.get('/', foodsController.getFoods);
router.get('/:id', foodsController.getFoodById);
router.delete('/:id', foodsController.deleteFoodById);
router.put('/:id', foodsController.updateFoodById);

module.exports = router;