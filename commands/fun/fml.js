const Command = require('../../structures/command.js');
const snekfetch = require('snekfetch');
const { parse } = require('fast-html-parser');
const { MessageEmbed } = require('discord.js');

module.exports = class FMLCommand extends Command {
	constructor(group) {
		super({
			name: 'fml',
			description: 'Get a random fml post.',
			group
		});
	}

	async run(message) {
		const { text: html } = await snekfetch.get('http://www.fmylife.com/random');
		const root = parse(html);
		const article = root.querySelector('.block a');
		const embed = new MessageEmbed().setColor(0x32aae1).setTitle('Random FML post!').setDescription(article.text)
		return message.channel.send({ embed });
	}
};
