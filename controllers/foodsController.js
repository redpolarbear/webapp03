'use strict';

var db = require('../db');
var _ = require('underscore');

var exports = module.exports = {};

// function for POST /foods
exports.createFood = function(req, res) {
	var body = _.pick(req.body, 'name', 'description', 'code', 'purchaseDate', 'produceDate', 'validPeriod', 'expireDate');

	// validate and calculate the value of the key-values

	// expireDate no later than produceDate

	// purchaseDate no earlier than produceDate

	// if produceDate === null, produceDate = purchaseDate = today();

	// validPeriod = expireDate - produceDate || expireDate - purchaseDate;

	// expireDate = produceDate + validPeriod

	// create the food with the user.id
	// db.food.create(body).then(function(food) {
	// 	req.user.addFood(food).then(function() {
	// 		return food.reload();
	// 	}).then(function (food) {
	// 		res.json(food.toJSON());
	// 	});
	// }).catch(function(e) {
	// 	res.status(400).json(e);
	// });

	db.food.create(body).then(function(food) {
		res.json(food.toJSON());
	}).catch(function(e) {
		res.status(400).json(e);
	});

};

// function for GET /foods/?q=xxxxx
exports.getFoods = function(req, res) {
	var query = req.query;
	var where = {
		// userId: req.user.get('id')
	};

	// if (query.hasOwnProperty('foodName') && query.completed === 'true') {
	// 	where.completed = true;
	// } else if (query.hasOwnProperty('completed') && query.completed === 'false') {
	// 	where.completed = false;
	// }

	if (query.hasOwnProperty('q') && query.q.length > 0) {
		where.name = {
			$like: '%' + query.q + '%'
		};
	}

	db.food.findAll({
		where: where
	}).then(function(foods) {
		if (foods) {
		// if (foods && foods.length > 0) {
			res.json(foods);
		} else {
			res.status(404).send();
		}
	}, function(e) {
		res.status(500).send();
	});
};

// function for the GET /foods/:id
exports.getFoodById = function(req, res) {
	var foodId = parseInt(req.params.id, 10);
	db.food.findOne({
		where: {
			id: foodId,
			userId: req.user.get('id')
		}
	}).then(function(food) {
		if (!!food) {
			res.json(food);
		} else {
			res.status(404).send();
		}
	}, function(e) {
		res.status(500).send();
	});
};

// function for DELETE /foods/:id
exports.deleteFoodById = function(req, res) {
	var foodId = parseInt(req.params.id, 10);

	db.food.destroy({
		where: {
			id: foodId,
			userId: req.user.get('id')
		}
	}).then(function(rowsDeleted) {
		if (rowsDeleted === 0) {
			res.status(404).json({
				error: 'No food with this id'
			});
		} else {
			res.status(204).send();
		}
	}, function() {
		res.status(500).send();
	});
};

// function for PUT /foods/:id
exports.updateFoodById = function(req, res) {
	var foodId = parseInt(req.params.id, 10);
	var body = _.pick(req.body,
		'name',
		'description',
		'code',
		'purchaseDate',
		'produceDate',
		'validPeriod',
		'expireDate'
	);
	var attributes = body;

	// if (body.hasOwnProperty('name')) {
	// 	attributes.name = body.name;
	// }

	// if (body.hasOwnProperty('description')) {
	// 	attributes.description = body.description;
	// }

	db.food.findOne({
		where: {
			id: foodId,
			userId: req.user.get('id')
		}
	}).then(function(food) {
		if (food) {
			food.update(attributes).then(function(food) {
				res.json(food.toJSON());
			}, function(e) {
				res.status(400).json(e);
			});
		} else {
			res.status(404).send();
		}
	}, function() {
		res.status(500).send();
	});
};