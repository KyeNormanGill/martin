const Command = require('../../structures/command.js');
const { stripIndents } = require('common-tags');
const { error } = require('../../util.js');

module.exports = class RollCommand extends Command {
	constructor(group) {
		super({
			name: 'roll',
			description: 'Roll a dice where the sides are specified by you.',
			aliases: ['dice'],
			group: group
		});
	}

	run(message, args) {
		if (!args) return error('You didn\'t specify how many sides on the die?', message);
		message.channel.send(stripIndents`
			**${message.member.displayName}** rolled a die.
			
			The die landed on **${Math.floor(Math.random() * parseInt(args))}**
		`);
	}
};
