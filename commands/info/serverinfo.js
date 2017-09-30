const Command = require('../../structures/command.js');

module.exports = class ServerInfoCommand extends Command {
	constructor(group) {
		super({
			name: 'serverinfo',
			description: 'Displays information on the server.',
			guildOnly: true,
			ownerOnly: true,
			aliases: ['si'],
			perms: ['EMBED_LINKS'],
			group: group
		});
	}

	run(message, args) {

	}
};
