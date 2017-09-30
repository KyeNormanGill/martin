const Command = require('../../structures/command.js');
const { error, findUser } = require('../../util.js');

module.exports = class AvatarCommand extends Command {
	constructor(group) {
		super({
			name: 'balance',
			description: 'Displays the balance of a user or yourself.',
			guildOnly: true,
			aliases: ['bal', 'money'],
			perms: ['EMBED_LINKS'],
			group: group
		});
	}

	run(message, args) {
		if (!args) {
			message.channel.send(`You have **${message.author.money}** money in the bank!`);
		} else {
			const person = findUser(message, args);

			if (!person) return error('No user found!', message);

			message.channel.send(`**${person.username}** has **${message.author.money}** money in the bank!`);
		}
	}
};
