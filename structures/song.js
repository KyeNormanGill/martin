const { embedColour } = require('../config.json');
const { stripIndents } = require('common-tags');
const moment = require('moment');
require('moment-duration-format');

module.exports = class Song {
	constructor(options = {}) {
		if (options.name === undefined) throw Error('Song name not provided!');
		if (options.requestedBy === undefined) throw Error('Requested ID not provided!');
		if (options.length === undefined) throw Error('Song length not provided!');
		if (options.imageURL === undefined) throw Error('Song image not provided!');

		this.name = options.name;
		this.requestedBy = options.requestedBy;
		this.length = this._formatLength(options.length);
		this.imageURL = options.imageURL;
		this.obj = options.obj;
	}

	getEmbedObject() {
		return {
			color: parseInt(embedColour, 16),
			description: stripIndents`
				**Song:** ${this.name}
				**Length:** ${this.length}
				**Queued by:** ${this.requestedBy.toString()}
			`,
			thumbnail: { url: this.imageURL }
		};
	}

	getSongObject() {
		return {
			name: this.name,
			track: this.track,
			requestedBy: this.requestedBy,
			length: this.length,
			imageURL: this.imageURL,
			obj: this.obj
		};
	}

	play(message) {
		message.channel.send({ embed: this.getEmbedObject() });

		this._handleQueue(message);
	}

	_handleQueue(message) {
		const currQueue = message.client.queues.get(message.guild.id);
		if (currQueue && currQueue.length) {
			currQueue.push(this.getSongObject());
		} else {
			message.client.queues.set(message.guild.id, [this.getSongObject()]);
			this._playSong(message);
		}
	}

	async _playSong(message) {
		const queue = message.client.queues.get(message.guild.id);

		const player = message.client.lavalink.players.get(message.guild.id);
		await player.join(message.member.voice.channelID, { deaf: false, mute: false });
		console.log(queue[0].obj);
		await player.play(queue[0].obj);
		player.once('event', async e => {
			console.log(e);
			if (e.reason === 'STOPPED' || e.reason === 'FINISHED') {
				queue.shift();
				if (queue.length !== 0) {
					setTimeout(() => this._playSong(message), 1000);
				} else {
					await message.channel.send('No more songs left in the queue! Leaving...');
					this._leave(message.guild);
				}
			}
		});
	}

	_leave(guild) {
		guild.client.ws.send({
			op: 4,
			d: {
				guild_id: guild.id,
				channel_id: null,
				self_mute: false,
				self_deaf: false
			}
		});
	}

	_formatLength(length) {
		if (length > 3600000) throw new Error('Length too long!');
		return moment.duration(length).format('m[ minutes and ]s[ seconds]');
	}
}
