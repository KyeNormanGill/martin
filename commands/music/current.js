const Command = require('../../structures/command.js');
const { error } = require('../../util.js');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');
const { embedColour } = require('../../config.json');

module.exports = class CurrentCommand extends Command {
	constructor(group) {
		super({
			name: 'current',
			description: 'Displays the current song playing.',
			guildOnly: true,
			aliases: ['np', 'nowplaying'],
			group
		});
	}

	run(message) {
		const { voiceChannel } = message.guild.me;
		if (!voiceChannel) return error('I can\'t tell you the songs if i\'m not in a voice channel playing them.', message);

		const info = message.client.queues.get(message.guild.id);
		if (!info) return error('No songs are playing!', message);

		const song = info[0];

		const embed = new MessageEmbed()
			.setColor(embedColour)
			.setDescription(stripIndents`
				**Song:** ${song.name}
				**Length:** ${song.length}
				**Queued by:** ${song.requestedBy.toString()}
			`)
			.setImage(song.imageURL);

		message.channel.send({ embed });
	}
};