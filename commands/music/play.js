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

		const { channel } = message.member.voice;
		if (!channel || channel.type !== 'voice') return error('You\'re not in a voice channel.', message);

		const songs = await message.client.lavalink.load(`ytsearch:${args}`);

		if (!songs) return error(`No songs found with name: **${args}**`, message);

		const currentSong = songs.tracks[0];
		if (currentSong.info.isStream) return error('Sorry! I can\'t play streams', message);

		try {
			const song = new Song({
				name: currentSong.info.title,
				requestedBy: message.member,
				length: currentSong.info.length,
				imageURL: `https://img.youtube.com/vi/${currentSong.info.identifier}/mqdefault.jpg`,
				obj: currentSong
			});

			song.play(message);
		} catch (e) {
			console.error(e);
			return error('No songs above 1 hour', message);
		}
	}
};