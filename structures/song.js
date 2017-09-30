const { colour } = require('../config.json');
const { stripIndents } = require('common-tags');
const ytdl = require('ytdl-core');

class Song {
	constructor(options = {}) {
		if (options.name === undefined) throw Error('Song name not provided!');
		if (options.URL === undefined) throw Error('Song URL not provided!');
		if (options.requestedBy === undefined) throw Error('Requested ID not provided!');
		if (options.length === undefined) throw Error('Song length not provided!');
		if (options.imageURL === undefined) throw Error('Song image not provided!');

		this.name = options.name;
		this.URL = options.URL;
		this.requestedBy = options.requestedBy;
		this.length = this._formatLength(options.length);
		this.imageURL = options.imageURL;
	}

	getEmbedObject() {
		return {
			color: parseInt(colour, 16),
			description: stripIndents`
				**Song:** ${this.name}
				**Length:** ${this.length}
				**Queued by:** ${this.requestedBy}
			`,
			thumbnail: { url: this.imageURL }
		};
	}

	getSongObject() {
		return {
			name: this.name,
			URL: this.URL,
			requestedBy: this.requestedBy,
			length: this.length,
			imageURL: this.imageURL
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
		if (!message.guild.voiceConnection) await message.member.voiceChannel.join();

		const queue = message.client.queues.get(message.guild.id);

		const stream = ytdl(queue[0].URL, { audioonly: true });

		const dispatcher = message.guild.voiceConnection.playStream(stream, { passes: 1, volume: 0.25 });

		stream.once('error', err => {
			console.log(err);
		});

		dispatcher.once('end', async reason => {
			if (reason === 'end') {
				message.guild.me.voiceChannel.leave();
				message.client.queues.delete(message.guild.id);
			} else {
				queue.shift();
				if (queue.length !== 0) {
					setTimeout(() => this._playSong(message), 1000);
				} else {
					await message.channel.send('No more songs left in the queue! Leaving...');
					message.guild.me.voiceChannel.leave();
				}
			}
		});
	}

	_formatLength(obj) {
		if (obj.years || obj.months || obj.weeks || obj.days || obj.hours) throw new Error('No songs above 1 hour');

		return `${obj.minutes}m ${obj.seconds < 10 ? `0${obj.seconds}` : obj.seconds}s`;
	}
}

module.exports = Song;
