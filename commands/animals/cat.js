const Command = require('../../structures/command.js');
const { get } = require('snekfetch');
const { RichEmbed } = require('discord.js');
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
		const { body } = await get('http://random.cat/meow');
		const embed = new RichEmbed().setColor(colour).setImage(body.file);

		message.channel.send({ embed });
	}
};
