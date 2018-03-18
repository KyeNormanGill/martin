const Command = require('../../structures/command.js');
const { error } = require('../../util.js');
const Song = require('../../structures/song.js');
const YouTube = require('simple-youtube-api');
const token = require('../../config.json').keys.google;
const youtube = new YouTube(token);

module.exports = class PlayCommand extends Command {
	constructor(group) {
		super({
			name: 'play',
			description: 'Play a song in your voice channel!',
			guildOnly: true,
			aliases: ['song'],
			group: group
		});
	}

	async run(message, args) {
		if (!args) return error('Please provide a song name or spotify URI!', message);

		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel || voiceChannel.type !== 'voice') return error('You\'re not in a voice channel.', message);

		const baseData = await youtube.searchVideos(args, 1);
		if (!baseData.length) return error('No songs found! Try again.', message);

		const vidData = await youtube.getVideoByID(baseData[0].id);
		if (!vidData) return error('There was a problem with youtube\'s api', message);

		try {
			const song = new Song({
				name: vidData.title,
				URL: `https://www.youtube.com/watch?v=${vidData.id}`,
				requestedBy: message.member,
				length: vidData.duration,
				imageURL: `https://img.youtube.com/vi/${vidData.id}/mqdefault.jpg`
			});

			song.play(message);
		} catch (e) {
			return error('No songs above 1 hour', message);
		}
	}
};
