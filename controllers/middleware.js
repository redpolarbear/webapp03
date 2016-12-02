/*
START
1. get the token from the req.header which the key is 'Auth' - `var token = req.get('Auth')`;
2. if it's a valid user, the `token` won't be undefined;
3. find the token from the db by the `token` variable - `WHERE tokenHash = cryptojs.MD5(token).toString()`;
4. Promise resovle the tokenInstance;
5. if return, let the `req.token = tokenInstance`, if not, Authentication Failed - `throw new Error()`;
6. find the user by 'token' which is from the req.header('Auth');
7. Promise resolve the userInstance;
8. if return, let the `req.user = userInstance`, if not, Authentication Failed - `res.status(401).send()`;
9. next();
END

One valid login MUST meet the following requirement:
* No.1 - The token in the req.header('Auth') must NOT be 'undefined';
* No.2 - Able to find the 'tokenHash' in the db by the cryptojs.MD5;
* No.3 - Able to find the 'user' by the 'token' from the req.header('Auth');

After the 'Authentication',
- req.token = tokenInstance;
- req.user = userInstance;
*/

var cryptojs = require('crypto-js');

module.exports = function (db) {

	return {
		requireAuthentication: function (req, res, next) {
			var token = req.get('Auth') || '';

			db.token.findOne({
				where: {
					tokenHash: cryptojs.MD5(token).toString()
				}
			}).then(function (tokenInstance) {
				if (!tokenInstance) {
					throw new Error();
				}

				req.token = tokenInstance;
				return db.user.findByToken(token);
			}).then(function (user) {
				req.user = user;
				next();
			}).catch(function () {
				res.status(401).send();
			});
		}
	};

};