const Command = require('../../structures/command.js');
const { error } = require('../../util.js');

module.exports = class SkipCommand extends Command {
	constructor(group) {
		super({
			name: 'skip',
			description: 'Skip the current song!.',
			guildOnly: true,
			group
		});
	}

	async run(message, args) {
		const { channel } = message.guild.me.voice;

		if (!channel) return error('I can\'t end the music if i\'m not in a voice channel.', message);
		if (!channel.members.has(message.author.id)) return error('You\'re not in the voice channel playing music.', message);
        
		message.client.lavalink.players.get(message.guild.id).stop();
	}
};