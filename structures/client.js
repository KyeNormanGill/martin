const { Client: voiceClient, Http } = require('lavalink');
const { Client, Collection } = require('discord.js');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const { lavalink } = require('../config.json');

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
		this.voice = new class extends voiceClient {
			constructor() {
				super({
					password: lavalink,
					userID: '421022757573230595'
				});
			}

			send(guildID, packet) {
				that.ws.send(packet);
			}
		};
		this.songParser = new Http(this.voice, 'http://lavalink:2333');

		this.on('raw', e => {
			if (e.t === 'VOICE_STATE_UPDATE') return this.voice.voiceStateUpdate(e.d);
			if (e.t === 'VOICE_SERVER_UPDATE') return this.voice.voiceServerUpdate(e.d);
		});

		this.voice.on('TrackEndEvent', e => {
			console.log(e);
		});

		this.voice.on('TrackExceptionEvent', e => {
			console.log(e);
		});

		this.voice.on('TrackStuckEvent', e => {
			console.log(e);
		});

		this.once('ready', async() => {
			setTimeout(() => {
				that.voice.connect('ws://lavalink:8080');
				console.log('Lavalink connected!');
			}, 5000);
			const readdir = promisify(fs.readdir);
			const groups = await readdir(this.commandPath);

			for (const group of groups) {
				const commands = await readdir(path.join(this.commandPath, group)); // eslint-disable-line
				this.groups.set(group, []);
				for (const command of commands) {
					const Command = require(path.join(this.commandPath, group, command));
					const cmd = new Command(group);

					this.commands.set(cmd.name, cmd);
					this.groups.get(group).push(cmd);
				}
			}
			this.emit('commandsLoaded', this.commands);

			const events = await readdir(this.eventPath);
			for (const event of events) {
				console.log(`Loaded ${event}`);
				this.on(event.replace('.js', ''), (...args) => require(path.join(this.eventPath, event))(this, ...args));
			}

			this.emit('eventsLoaded', events.length);
		});
	}
}

module.exports = Martin;
