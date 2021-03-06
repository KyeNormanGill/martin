const Command = require('../../structures/command.js');

module.exports = class ConfigCommand extends Command {
	constructor(group) {
		super({
			name: 'invite',
			description: 'Provides a link to this discord bot to add to another server!',
			guildOnly: false,
			aliases: ['join', 'add'],
			group
		});
	}

	run(message) {
		message.channel.send([
			`Here is an invite to **${message.client.user.username}'s** home!`,
			'https://discord.gg/MBVyQdT',
			'',
			'Here is an invite link for the bot!',
			'<https://discordapp.com/oauth2/authorize/?permissions=8&scope=bot&client_id=349952389589237762>'
		].join('\n'));
	}
};
