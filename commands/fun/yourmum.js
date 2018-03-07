const Command = require('../../structures/command.js');
const { findUser } = require('../../util.js');
const { get } = require('snekfetch');

module.exports = class YourMumCommand extends Command {
	constructor(group) {
		super({
			name: 'insult',
			description: 'Insult a user.',
			aliases: ['yamum', 'mum'],
			group: group
		});
	}

	async run(message, args) {
		let user = findUser(message, args);

		if (!user || user.id === message.client.id) user = message.author;
		const { text } = await get('http://api.yomomma.info/');

		message.channel.send(`${user}, ${JSON.parse(text).joke}`);
	}
};
