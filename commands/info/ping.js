const Command = require('../../structures/command.js');

module.exports = class PingCommand extends Command {
	constructor(group) {
		super({
			name: 'ping',
			description: 'Show the bots ping to discord with a relay message.',
			group: group
		});
	}

	run(message) {
		message.channel.send('Ping...')
			.then(msg => msg.edit(`Pong! \`${msg.createdTimestamp - message.createdTimestamp}ms\``));
	}
};
