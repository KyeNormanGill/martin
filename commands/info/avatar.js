const Command = require('../../structures/command.js');
const { error, findUser } = require('../../util.js');
const { RichEmbed } = require('discord.js');
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
		const user = findUser(message, args);

		if (user === null) {
			error('Please input a valid user', message);
		} else {
			const embed = new RichEmbed();
			embed.setColor(colour);

			if (args.length === 0) {
				embed.setImage(message.author.avatarURL);
			} else {
				embed.setImage(user.avatarURL);
			}
			message.channel.send({ embed });
		}
	}
};
