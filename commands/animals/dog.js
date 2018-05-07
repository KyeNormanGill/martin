const Command = require('../../structures/command.js');
const snekfetch  = require('snekfetch');
const { MessageEmbed } = require('discord.js');
const { embedColour } = require('../../config.json');

module.exports = class DogCommand extends Command {
	constructor(group) {
		super({
			name: 'dog',
			description: 'Display a random dog.',
			guildOnly: true,
			aliases: ['puppy', 'pup'],
			perms: ['EMBED_LINKS'],
			group
		});
	}

	async run(message) {
		const { body } = await snekfetch.get('https://random.dog/woof');
		const embed = new MessageEmbed()
			.setColor(embedColour)
			.setImage(`https://random.dog/${body}`);

		message.channel.send({ embed });
	}
};
