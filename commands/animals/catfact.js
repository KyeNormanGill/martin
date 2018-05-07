const Command = require('../../structures/command.js');
const snekfetch = require('snekfetch');
const { MessageEmbed } = require('discord.js');
const { embedColour } = require('../../config.json');

module.exports = class CatFactCommand extends Command {
	constructor(group) {
		super({
			name: 'catfact',
			description: 'Get a random cat fact.',
			guildOnly: true,
			aliases: ['randomcatfact'],
			perms: ['EMBED_LINKS'],
			group
		});
	}

	async run(message) {
		const { body } = await snekfetch.get('https://catfact.ninja/fact');

		const embed = new MessageEmbed()
			.setTitle('Random cat fact!')
			.setColor(embedColour)
			.setDescription(body.fact);

		message.channel.send({ embed });
	}
};
