const Command = require('../../structures/command.js');
const snekfetch = require('snekfetch');
const { MessageEmbed } = require('discord.js');
const { embedColour } = require('../../config.json');

module.exports = class DogFactCommand extends Command {
	constructor(group) {
		super({
			name: 'dogfact',
			description: 'Get a random dog fact.',
			guildOnly: true,
			aliases: ['randomdogfact'],
			perms: ['EMBED_LINKS'],
			group
		});
	}

	async run(message) {
		const { body } = await snekfetch.get('https://dog-api.kinduff.com/api/facts');
		const embed = new MessageEmbed().setTitle('Random dog fact!').setColor(embedColour).setDescription(body.facts[0]);

		message.channel.send({ embed });
	}
};
