const db = require('../sqlite.js');
const Sequelize = require('sequelize');

const Users = db.define('users', {
	UserId: {
		type: Sequelize.STRING,
		unique: true
	},
	Money: Sequelize.INTEGER,
	Experience: Sequelize.INTEGER
});

module.exports = Users;
