const Command = require('../../structures/command.js');
const { get } = require('snekfetch');
const { MessageEmbed, MessageAttachment } = require('discord.js');
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
		const { body } = await get('http://thecatapi.com/api/images/get');

		const embed = new MessageEmbed()
			.setColor(colour)
			.attachFiles([new MessageAttachment(body, 'file.png')])
			.setImage('attachment://file.png');;

		message.channel.send({ embed });
	}
};
