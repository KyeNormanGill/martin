const Command = require('../../structures/command.js');

module.exports = class RebootCommand extends Command {
	constructor(group) {
		super({
			name: 'reboot',
			description: 'Reboots the bot.',
			aliases: ['restart', 'shutdown'],
			ownerOnly: true,
			group
		});
	}

	async run(message) {
		await message.channel.send('Restarting... :ok_hand:');
		process.exit();
	}
};
