const Command = require('../../structures/command.js');
const { error, find } = require('../../util.js');
const { MessageEmbed } = require('discord.js');
const { embedColour } = require('../../config.json');

module.exports = class AvatarCommand extends Command {
	constructor(group) {
		super({
			name: 'avatar',
			description: 'Displays the image of a user.',
			guildOnly: true,
			aliases: ['image', 'dp'],
			perms: ['EMBED_LINKS'],
			group
		});
	}

	run(message, args) {
		const user = find.User(message, args) || message.author;

		if (!user) {
			return error('Please input a valid user', message);
		} else {
			const embed = new MessageEmbed()
				.setColor(embedColour)
				.setImage(user.avatarURL({ size: 512 }));

			message.channel.send({ embed });
		}
	}
};
