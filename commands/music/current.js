const Command = require('../../structures/command.js');
const { error } = require('../../util.js');
const { stripIndents } = require('common-tags');
const { RichEmbed } = require('discord.js');
const { colour } = require('../../config.json');

module.exports = class CurrentCommand extends Command {
	constructor(group) {
		super({
			name: 'current',
			description: 'Displays the current song playing.',
			guildOnly: true,
			aliases: ['np', 'nowplaying'],
			group: group
		});
	}

	run(message) {
		const voiceChannel = message.guild.me.voiceChannel;
		if (!voiceChannel) return error('I can\'t tell you the songs if i\'m not in a voice channel playing them.', message);

		if (message.guild.voiceConnection.player.dispatcher) {
			const info = message.client.queues.get(message.guild.id);

			const embed = new RichEmbed()
				.setColor(colour)
				.setDescription(stripIndents`
					**Song:** ${info[0].name}
					**Length:** ${info[0].length}
					**Queued by:** ${info[0].requestedBy.toString()}
				`)
				.setImage(info[0].imageURL);

			message.channel.send({ embed });
		} else {
			error('I\'m not playing anything!', message);
		}
	}
};
