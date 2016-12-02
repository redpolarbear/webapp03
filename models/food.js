module.exports = function(sequelize, DataTypes) {
	var food = sequelize.define('food', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 100]
			}
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [1, 255]
			}
		},
		code: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [1, 13]
			}
		},
		purchaseDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			defaultValue: function() {
				var currentTime = new Date();
				var month = currentTime.getMonth() + 1;
				var day = currentTime.getDate();
				var year = currentTime.getFullYear();
				return (year + "-" + month + "-" + day);
			},
			validate: {
				isDate: true
			}
		},
		produceDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			validate: {
				isDate: true
			}
		},
		validPeriod: {
			type: DataTypes.INTEGER(),
			allowNull: true,
			
		},
		expireDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			validate: {
				isDate: true
			}
		},
		isExpired: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	});

	return food;
};