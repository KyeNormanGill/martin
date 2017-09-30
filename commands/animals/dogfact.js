const Command = require('../../structures/command.js');
const { get } = require('snekfetch');
const { RichEmbed } = require('discord.js');
const { colour } = require('../../config.json');

module.exports = class DogFactCommand extends Command {
	constructor(group) {
		super({
			name: 'dogfact',
			description: 'Get a random dog fact.',
			guildOnly: true,
			aliases: ['randomdogfact'],
			perms: ['EMBED_LINKS'],
			group: group
		});
	}

	async run(message) {
		const { body } = await get('https://dog-api.kinduff.com/api/facts');
		const embed = new RichEmbed().setTitle('Random dog fact!').setColor(colour).setDescription(body.facts[0]);

		message.channel.send({ embed });
	}
};
