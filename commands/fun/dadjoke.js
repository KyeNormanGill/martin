const Command = require('../../structures/command.js');
const snekfetch = require('snekfetch');

module.exports = class DadjokeCommand extends Command {
	constructor(group) {
		super({
			name: 'dadjoke',
			description: 'Get a random dad joke.',
			aliases: ['dad'],
			group
		});
	}

	async run(message) {
		const { text } = await snekfetch.get('https://icanhazdadjoke.com/').set('Accept', 'text/plain');
		return message.channel.send(text);
	}
};
