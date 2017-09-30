const Command = require('../../structures/command.js');
const { error } = require('../../util.js');

module.exports = class CurrentCommand extends Command {
	constructor(group) {
		super({
			name: 'skip',
			description: 'Skips the current song.',
			guildOnly: true,
			aliases: ['next'],
			group: group
		});
	}

	run(message) {
		const voiceChannel = message.guild.me.voiceChannel;
		if (!voiceChannel) return error('I can\'t skip songs if i\'m not in a voice channel.', message);
		if (!voiceChannel.members.has(message.author.id)) return error('You\'re not in the voice channel playing music.', message);

		if (message.guild.voiceConnection.dispatcher) {
			message.channel.send('Skipping...');
			message.guild.voiceConnection.dispatcher.end();
		} else {
			error('I\'m not playing anything?', message);
		}
	}
};
