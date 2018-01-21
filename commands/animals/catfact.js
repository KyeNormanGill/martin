const Command = require('../../structures/command.js');
const { get } = require('snekfetch');
const { MessageEmbed } = require('discord.js');
const { colour } = require('../../config.json');

module.exports = class CatFactCommand extends Command {
	constructor(group) {
		super({
			name: 'catfact',
			description: 'Get a random cat fact.',
			guildOnly: true,
			aliases: ['randomcatfact'],
			perms: ['EMBED_LINKS'],
			group: group
		});
	}

	async run(message) {
		const { body } = await get('https://catfact.ninja/fact');
		const embed = new MessageEmbed().setTitle('Random cat fact!').setColor(colour).setDescription(body.fact);

		message.channel.send({ embed });
	}
};
