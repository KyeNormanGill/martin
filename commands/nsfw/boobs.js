const Command = require('../../structures/command.js');
const snekfetch = require('snekfetch');
const { error } = require('../../util.js');
const { MessageEmbed } = require('discord.js');
const { embedColour } = require('../../config.json');

module.exports = class BoobsCommand extends Command {
	constructor(group) {
		super({
			name: 'boobs',
			description: 'Displays a random picture of nsfw boobs.',
			guildOnly: false,
			aliases: ['tits'],
			perms: ['EMBED_LINKS'],
			group
		});
	}

	async run(message) {
		if (!message.channel.nsfw) return error('You can only use these commands in NSFW channels.', message);
		
		const { body } = await snekfetch.get('http://api.oboobs.ru/boobs/0/1/random')
		const embed = new MessageEmbed()
			.setColor(embedColour)
			.setImage(`http://media.oboobs.ru/${body[0].preview}`);

		message.channel.send({ embed });
	}
};
