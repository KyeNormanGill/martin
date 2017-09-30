const Command = require('../../structures/command.js');
const snekfetch = require('snekfetch');
const { error } = require('../../util.js');
const { RichEmbed } = require('discord.js');
const { colour } = require('../../config.json');

module.exports = class ButtsCommand extends Command {
	constructor(group) {
		super({
			name: 'butts',
			description: 'Displays a random picture of nsfw butts.',
			guildOnly: false,
			aliases: ['ass'],
			perms: ['EMBED_LINKS'],
			group: group
		});
	}

	async run(message) {
		if (message.channel.nsfw) {
			const { body } = await snekfetch.get('http://api.obutts.ru/butts/0/1/random');
			const embed = new RichEmbed().setColor(colour)
				.setImage(`http://media.obutts.ru/${body[0].preview}`);

			message.channel.send({ embed });
		} else {
			error('You can only use these commands in NSFW channels.', message);
		}
	}
};
