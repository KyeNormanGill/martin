const Command = require('../../structures/command.js');
const Song = require('../../structures/song.js');
const { error } = require('../../util.js');
const { MessageEmbed } = require('discord.js');

module.exports = class PlayCommand extends Command {
	constructor(group) {
		super({
			name: 'play',
			description: 'Play a song!.',
			guildOnly: true,
			group
		});
	}

	async run(message, args) {
		if (!args) return error('Please provide a song name!', message);

		const { voiceChannel } = message.member;
		if (!voiceChannel || voiceChannel.type !== 'voice') return error('You\'re not in a voice channel.', message);

		const songs = await message.client.songParser.load(`ytsearch:${args}`);
		const song = song[0];
		if (song.info.isStream) return error('Sorry! I can\'t play streams', message);

		try {
			const song = new Song({
				name: song.info.title,
				track: song.track,
				requestedBy: message.member,
				length: song.info.length,
				imageURL: `https://img.youtube.com/vi/${song.info.identifier}/mqdefault.jpg`
			});

			song.play(message);
		} catch (e) {
			console.error(e);
			return error('No songs above 1 hour', message);
		}
	}
};