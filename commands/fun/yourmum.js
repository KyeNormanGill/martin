const Command = require('../../structures/command.js');
const { find } = require('../../util.js');
const snekfetch = require('snekfetch');

module.exports = class YourMumCommand extends Command {
	constructor(group) {
		super({
			name: 'yourmum',
			description: 'Get a random your mum joke.',
			aliases: ['yamum', 'mum'],
			group
		});
	}

	async run(message, args) {
		let user = find.User(message, args);

		if (!user || user.id === message.client.id) user = message.author;
		const { text } = await snekfetch.get('http://api.yomomma.info/');

		message.channel.send(`${user}, ${JSON.parse(text).joke}`);
	}
};
