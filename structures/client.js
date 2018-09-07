const { Client, Collection } = require('discord.js');
const { Node } = require('lavalink');

module.exports = class Martin extends Client {
	constructor(options = {}) {
		super(options);

		const that = this;
		this.config = process.env;
		this.ownerId = options.ownerId;
		this.prefix = options.prefix;
		this.commandPath = options.commandPath;
		this.eventPath = options.eventPath;
		this.streamedRecently = [];
		this.commands = new Collection();
		this.groups = new Collection();
		this.queues = new Collection();
		this.lavalink = new Node({
			userID: '349952389589237762',
			password: this.config.lavalink,
			hosts: {
				rest: 'http://lavalink:2333',
				ws: 'ws://lavalink:2333'
			},
			send(guildID, packet) {
			  if (that.guilds.has(guildID)) return that.ws.send(packet);
			  throw new Error('attempted to send a packet on the wrong shard');
			}
		});
		this.on('raw', pk => {
			if (pk.t === 'VOICE_STATE_UPDATE') this.lavalink.voiceStateUpdate(pk.d);
			if (pk.t === 'VOICE_SERVER_UPDATE') this.lavalink.voiceServerUpdate(pk.d);
		});
	}
}
