const Command = require('../../structures/command.js');
const { MessageEmbed } = require('discord.js');
const { colour } = require('../../config.json');

module.exports = class PlayCommand extends Command {
	constructor(group) {
		super({
			name: 'play',
			description: 'Play a song!.',
			guildOnly: true,
			group: group
		});
	}

	async run(message, args) {
		const player = message.client.voice.players.get(message.guild.id);
		await player.join(message.member.voiceChannelID, { deaf: false, mute: false });
		const songs = await message.client.songParser.load(`ytsearch:${args}`);
		await player.play(songs[0].track);
		console.log(songs[0]);
		message.channel.send(`Playing ${songs[0].name}`);
	}
};
