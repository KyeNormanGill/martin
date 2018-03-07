const Command = require('../../structures/command.js');
const { stripIndents } = require('common-tags');
const { error } = require('../../util.js');

const responses = [
	'Nope',
	'I don\'t know, m8',
	'Hell naw',
	'Most likely',
	'Without a doubt!\u2764\uFE0F',
	'Yes, definitely! \uD83D\uDE04',
	'Most likely!',
	'Doubtful...',
	'YES YES YES!',
	'In your dreams!',
	'You already know the answer to that...',
	'Oh god, no.',
	'If that\'s what you want...'
];

module.exports = class EightBallCommand extends Command {
	constructor(group) {
		super({
			name: '8ball',
			description: 'Ask a question and get an answer.',
			aliases: ['ask'],
			group: group
		});
	}

	run(message, args) {
		if (!args) return error('You didn\'t ask a question?', message);

		return message.channel.send(stripIndents`
			**${message.author.username}** asked: ${args}
			
			**Answer**: ${responses[Math.floor(Math.random() * responses.length)]}
		`);
	}
};
