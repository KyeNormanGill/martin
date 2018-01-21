const Command = require('../../structures/command.js');
const { get } = require('snekfetch');
const { MessageEmbed } = require('discord.js');
const { colour } = require('../../config.json');

module.exports = class DogCommand extends Command {
	constructor(group) {
		super({
			name: 'dog',
			description: 'Display a random dog.',
			guildOnly: true,
			aliases: ['puppy', 'pup'],
			perms: ['EMBED_LINKS'],
			group: group
		});
	}

	async run(message) {
		const { body } = await get('https://random.dog/woof');
		const embed = new MessageEmbed().setColor(colour).setImage(`https://random.dog/${body}`);

		message.channel.send({ embed });
	}
};
