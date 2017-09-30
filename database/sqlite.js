const Sequelize = require('sequelize');

const Database = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',

	// SQLite only
	storage: 'database.sqlite',
	logging: false
});

module.exports = Database;
