const Command = require('../../structures/command.js');
const { error, findUser } = require('../../util.js');
const { MessageEmbed } = require('discord.js');
const { colour } = require('../../config.json');

module.exports = class AvatarCommand extends Command {
	constructor(group) {
		super({
			name: 'avatar',
			description: 'Displays the image of a user.',
			guildOnly: true,
			aliases: ['image', 'dp'],
			perms: ['EMBED_LINKS'],
			group: group
		});
	}

	run(message, args) {
		const user = findUser(message, args) || message.author;

		if (!user) {
			error('Please input a valid user', message);
		} else {
			const embed = new MessageEmbed()
				.setColor(colour)
				.setImage(user.avatarURL({ size: 512 }));

			message.channel.send({ embed });
		}
	}
};
