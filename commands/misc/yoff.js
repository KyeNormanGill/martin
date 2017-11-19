const Command = require('../../structures/command.js');
const { Attachment } = require('discord.js');

module.exports = class ConfigCommand extends Command {
	constructor(group) {
		super({
			name: 'yoff',
			description: 'Yoff!',
			guildOnly: false,
			group: group
		});
	}

	run(message) {
		message.channel.send(new Attachment('https://cdn.discordapp.com/attachments/174674066072928256/381103057422778368/yoff.png'));
	}
};
