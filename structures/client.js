const { Client, Collection } = require('discord.js');
const config = require('../config.json');
const lavalink = require('lavalink');

module.exports = class Martin extends Client {
	constructor(options = {}) {
		super(options);

		this.config = process.env;
		this.ownerId = options.ownerId;
		this.prefix = options.prefix;
		this.commandPath = options.commandPath;
		this.eventPath = options.eventPath;
		this.streamedRecently = [];
		this.commands = new Collection();
		this.groups = new Collection();
		this.queues = new Collection();
		lavalink.discordjs(this, {
			userID: '349952389589237762',
			password: this.config.lavalink
		});
		this.songParser = new lavalink.Http(this.lavalink, 'http://lavalink:2333');
	}
}
