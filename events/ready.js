const { updateStats } = require('../util.js');

module.exports = (client) => {
	console.log(`Logged in as ${client.user.tag}`);
	client.user.setActivity(`${client.prefix}help | ${client.guilds.size} guilds`);
	updateStats(client);
};
