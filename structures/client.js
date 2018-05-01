const { Client, Collection } = require('discord.js');
const config = require('../config.json');
const lavalink = require('lavalink');

class Martin extends Client {
	constructor(options = {}) {
		super(options);

		const that = this;
		this.ownerId = options.ownerId;
		this.prefix = options.prefix;
		this.commandPath = options.commandPath;
		this.eventPath = options.eventPath;
		this.streamedRecently = [];
		this.commands = new Collection();
		this.groups = new Collection();
		this.queues = new Collection();
		lavalink.discordjs(this, {
			userID: '421022757573230595',
			password: config.keys.lavalink
		});
		this.songParser = new lavalink.Http(this.lavalink, 'http://lavalink:2333');
	}
}

module.exports = Martin;
