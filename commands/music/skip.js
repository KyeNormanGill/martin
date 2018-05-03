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
		const { voiceChannel } = message.guild.me;

		if (!voiceChannel) return error('I can\'t end the music if i\'m not in a voice channel.', message);
		if (!voiceChannel.members.has(message.author.id)) return error('You\'re not in the voice channel playing music.', message);
        
		message.guild.player.stop();
	}
};