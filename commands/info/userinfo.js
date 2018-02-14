const Command = require('../../structures/command.js');
const { error, findUser } = require('../../util.js');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');
const { colour } = require('../../config.json');

module.exports = class UserInfoCommand extends Command {
	constructor(group) {
		super({
			name: 'userinfo',
			description: 'Show information on a user.',
			guildOnly: true,
			aliases: ['ui', 'spy'],
			perms: ['EMBED_LINKS'],
			group: group
		});
	}

	run(message, args) {
		const user = findUser(message, args);

		if (user === null) {
			error('Please input a valid user', message);
		} else {
			const embed = new MessageEmbed();
			const member = message.guild.members.get(user.id);
			const username = member.user.tag;
			const joinedAt = moment.utc(member.joinedTimestamp).format('MMM Do YYYY');
			const guildName = message.guild.name;
			const presence = user.presence.game ? user.presence.game.name : 'Nothing';
			const roles = member.roles.map(r => r.toString()).slice(1).join(' ');

			embed.setThumbnail(user.avatarURL({ size: 512 }))
				.setColor(colour)
				.addField('User Details', stripIndents`
					**Username** ${username}
					**Joined:** ${joinedAt}
					**Guild:** ${guildName}
					**Playing: **${presence}
					**Roles: ** ${roles}
				`);

			message.channel.send({ embed });
		}
	}
};
