const Command = require('../../structures/command.js');
const { stripIndents } = require('common-tags');

module.exports = class FlipCommand extends Command {
	constructor(group) {
		super({
			name: 'flip',
			description: 'Flips a coin.',
			aliases: ['coinflip', 'flipcoin', 'headsortails'],
			group
		});
	}

	run(message) {
		message.channel.send(stripIndents`
			**${message.author.username}** flipped a coin.
			
			The coin landed on **${Math.random() < 0.5 ? 'Tails' : 'Heads'}**
		`);
	}
};
