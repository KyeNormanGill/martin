const Command = require('../../structures/command.js');
const { MessageEmbed } = require('discord.js');
const { colour } = require('../../config.json');

module.exports = class HelpCommand extends Command {
	constructor(group) {
		super({
			name: 'help',
			description: 'Displays the commands.',
			guildOnly: true,
			aliases: ['helpme', '?'],
			group: group
		});
	}

	async run(message, args) {
		if (!args) {
			let text = `The prefix for **${message.client.user.username}** is \`${message.client.prefix}\` or a mention\n`;

			for (const [key, value] of message.client.groups.entries()) {
				if (key === 'admin' && message.author.id !== message.client.ownerId) continue;
				text += `\n__**${key.toUpperCase()}**__\n`;
				value.forEach(command => {
					text += `	**${command.name}**: ${command.description}\n`;
				});
			}

			await message.channel.send(`Sent you the info **${message.author.username}**`);
			await message.author.send(text);
		} else {
			const command = message.client.commands.find(cmd => cmd.name.toLowerCase().includes(args.toLowerCase()));
			if (!command) return message.channel.send(`Could not find a command called **${args}**`);

			const embed = new MessageEmbed()
				.setColor(colour)
				.setTitle(command.name)
				.setDescription(`**Description:** ${command.description}${command.aliases.length ? `\n\n**Aliases:** ${command.aliases.join(', ')}` : ''}`);

			await message.channel.send({ embed });
		}
	}
};
