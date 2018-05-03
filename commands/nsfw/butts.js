const Command = require('../../structures/command.js');
const snekfetch = require('snekfetch');
const { error } = require('../../util.js');
const { MessageEmbed } = require('discord.js');
const { embedColour } = require('../../config.json');

module.exports = class ButtsCommand extends Command {
	constructor(group) {
		super({
			name: 'butts',
			description: 'Displays a random picture of nsfw butts.',
			guildOnly: false,
			aliases: ['ass'],
			perms: ['EMBED_LINKS'],
			group
		});
	}

	async run(message) {
		if (!message.channel.nsfw) return error('You can only use these commands in NSFW channels.', message);

		const { body } = await snekfetch.get('http://api.obutts.ru/butts/0/1/random');
		const embed = new MessageEmbed()
			.setColor(embedColour)
			.setImage(`http://media.obutts.ru/${body[0].preview}`);

		message.channel.send({ embed });
	}
};
