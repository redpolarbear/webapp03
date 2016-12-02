/*Signup Process:
1. hook:beforeValidate Lowercase the 'email', validate whether the email is unique or not;
2. create the user in the db:
	a. save 'name' and 'email' directly;
	b. set the value - `salt = bcrypt.genSalt(10)`;
	c. set the value - `passwordHash = bcrypt.hashSync(password, salt)`;
	d. set the VIRTUAL value - `password = <password input by the user>`, while will NOT be saved in the db;
3. resolve the 'user' with the public information in JSON by instanceMethods:{toPublicJSON: function()};

Login Process:
1. classMethods - `authenticate({'name': 'xxxx', 'email': 'xxxx', 'password': 'xxxx'})`
	a. find the user by 'email' -> resolve(user);
	b. `bcrypt.compareSync(body.password, user.get('passwordHash'))`, if succeed, resolve(user), otherwise, reject();
2. `userInstance = user` - The 'user' was resolved from the Promis function;
3. Once having the valid user, generating the toke by the instanceMethods `user.generateToken('authentication')`
	a. stringData = JSON.stringify({'id': xxxx, 'type': 'authentication'});
	b. encryptedData = cryptojs.AES.encrypt(stringData, cryptojsSecret).toString();
	c. token = jwt.sign({token: encryptedData}, jwtSecret);
	d. return token;
4. Once having the token, save the token to the 'tokens' TABLE and resolve(tokenInstance)
	a. save the `cryptojs.MD5(token).toString()` to the 'tokenHash' field;
5. Save the token to the `req.header('Auth', tokenInstance.get('token'))` and `.json(userInstance.toPublicJSON()`

Logout Process:
1. Delete the tokenHash in the 'tokens' TABLE.
2. req.token is having the token value.
(req.token - e.g - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IlUyRnNkR1ZrWDE4OU5BYmdVWUJTY0NaWDYxdG4vQzgvRzFVMy9hQTNHMVAxVlNCTE9XeUdyQ0Zwek9TdEZ1eVhiSU9GQUhaZ3JPZEJ2Zm9JWUdyTDRBPT0iLCJpYXQiOjE0ODAxMTIwOTB9.BxH4Ioe6c42Vixlzd1XTZ78kNs0R4QXX7XqCEMMKaho)
*/

'use strict';

var db = require('../db');
var _ = require('underscore');

var exports = module.exports = {};

// POST /users for creating the user
exports.createUser = function(req, res) {
	var body = _.pick(req.body, 'name', 'email', 'password');

	db.user.create(body).then(function(user) {
		res.json(user.toPublicJSON());
	}, function(e) {
		res.status(400).json(e.message);
	});
};

// POST /users/login for user login
exports.loginUser = function (req, res) {
	var body = _.pick(req.body, 'email', 'password');
	var userInstance;

	db.user.authenticate(body).then(function (user) {
		var token = user.generateToken('authentication');
		userInstance = user;

		return db.token.create({
			token: token
		});
	}).then(function (tokenInstance) {
		res.header('Auth', tokenInstance.get('token')).json(userInstance.toPublicJSON());
	}).catch(function () {
		res.status(401).send();
	});
};


// DELETE /users/login for user logout
exports.logoutUser = function (req, res) {
	req.token.destroy().then(function () {
		res.status(204).send();
	}).catch(function (e) {
		res.status(500).send(e.message);	
	});
};

