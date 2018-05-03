const Command = require('../../structures/command.js');
const { exec } = require('child_process');

module.exports = class ExecCommand extends Command {
	constructor(group) {
		super({
			name: 'exec',
			description: 'This evaluates commands in cli.',
			ownerOnly: true,
			aliases: ['cli'],
			group
		});
	}

	run(message, args) {
		message.delete();
		return exec(args, (err, stdout) => {
			if (err) return message.channel.send(err.message, { code: true });

			return message.channel.send(stdout, { code: true });
		});
	}
};
