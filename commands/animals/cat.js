const Command = require('../../structures/command.js');
const { get } = require('snekfetch');
const { MessageEmbed } = require('discord.js');
const { colour } = require('../../config.json');

module.exports = class CatCommand extends Command {
	constructor(group) {
		super({
			name: 'cat',
			description: 'Display a random cat.',
			guildOnly: true,
			aliases: ['kitty', 'kitten'],
			perms: ['EMBED_LINKS'],
			group: group
		});
	}

	async run(message) {
		const { body } = await get('aws.random.cat/meow');
		const embed = new MessageEmbed().setColor(colour).setImage(body.file);

		message.channel.send({ embed });
	}
};
