const Command = require('../../structures/command.js');
const { get } = require('snekfetch');

module.exports = class DadjokeCommand extends Command {
	constructor(group) {
		super({
			name: 'dadjoke',
			description: 'Get a random dad joke.',
			aliases: ['dad'],
			group: group
		});
	}

	async run(message) {
		const { text } = await get('https://icanhazdadjoke.com/').set('Accept', 'text/plain');
		return message.channel.send(text);
	}
};
