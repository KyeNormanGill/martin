const Command = require('../../structures/command.js');
const { MessageEmbed } = require('discord.js');
const { error } = require('../../util.js');
const { colour } = require('../../config.json');

module.exports = class QueueCommand extends Command {
	constructor(group) {
		super({
			name: 'queue',
			description: 'Display all the songs in the queue.',
			guildOnly: true,
			aliases: ['allplaying'],
			group: group
		});
	}

	run(message) {
		const queue = message.client.queues.get(message.guild.id);

		if (!queue) return error('There are no songs in the queue! Play some with m)play <songname>', message);

		let queueTxt = '';

		queue.forEach(song => {
			queueTxt += `${song.requestedBy} - ${song.name} - ${song.length}\n`;
		});

		const embed = new MessageEmbed()
			.setColor(colour)
			.setTitle(`Queue for ${message.guild.name}`)
			.setDescription(queueTxt);

		message.channel.send({ embed });
	}
};
