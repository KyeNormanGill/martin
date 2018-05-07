const Command = require('../../structures/command.js');
const snekfetch = require('snekfetch');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { embedColour } = require('../../config.json');

module.exports = class CatCommand extends Command {
	constructor(group) {
		super({
			name: 'cat',
			description: 'Display a random cat.',
			guildOnly: true,
			aliases: ['kitty', 'kitten'],
			perms: ['EMBED_LINKS'],
			group
		});
	}

	async run(message) {
		const { body } = await snekfetch.get('http://thecatapi.com/api/images/get');

		const embed = new MessageEmbed()
			.setColor(embedColour)
			.attachFiles([new MessageAttachment(body, 'file.png')])
			.setImage('attachment://file.png');;

		message.channel.send({ embed });
	}
};
