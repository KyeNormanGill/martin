const Command = require('../../structures/command.js');
const { RichEmbed } = require('discord.js');
const { colour } = require('../../config.json');

module.exports = class ConfigCommand extends Command {
	constructor(group) {
		super({
			name: 'config',
			description: 'Shows the status of your servers configuration.',
			guildOnly: true,
			ownerOnly: true,
			aliases: ['configuration', 'settings'],
			perms: ['EMBED_LINKS'],
			group: group
		});
	}

	run(message) {
		let text = `Configuration for **${message.guild.name}**\n\n`;
		const embed = new RichEmbed().setColor(colour);

		const channels = message.guild.channels.filter(Gchannel => Gchannel.type === 'text').filter(t => t.topic);

		const tags = [{ name: '(join)', found: false }, { name: '(leave)', found: false }, { name: '(twitch)', found: false }];

		tags.forEach(tag => {
			channels.forEach(c => {
				if (c.topic.includes(tag.name) && tag.found === false) {
					text += `<:success:353927503540125697> ${tag.name.replace('(', '').replace(')', '')} - ${c}\n`;
					tag.found = true;
				}
			});
			if (!tag.found) {
				text += `<:error:353927476885585930> ${tag.name.replace('(', '').replace(')', '')}\n`;
			}
		});

		embed.setDescription(text);

		message.channel.send({ embed });
	}
};
