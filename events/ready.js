const { updateStats } = require('../util.js');

module.exports = function handle(client) {
	console.log(`Logged in as ${client.user.tag}`);
	client.user.setActivity(`${client.prefix}help | ${client.guilds.size} guilds`);
	updateStats(client);
};
