const Command = require('../../structures/command.js');
const { error } = require('../../util.js');

module.exports = class PlayCommand extends Command {
	constructor(group) {
		super({
			name: 'stop',
			description: 'Stop all the music in the queue.',
			guildOnly: true,
			aliases: ['end', 'stopall'],
			group: group
		});
	}

	run(message) {
		if (message.channel.permissionsFor(message.member).has('MANAGE_GUILD') || message.client.ownerId === message.author.id) {
			const voiceChannel = message.guild.me.voiceChannel;
			if (!voiceChannel) return error('I can\'t end the music if i\'m not in a voice channel.', message);
			if (!voiceChannel.members.has(message.author.id)) return error('You\'re not in the voice channel playing music.', message);

			if (message.guild.voiceConnection.dispatcher) {
				message.channel.send('Ending music and leaving channel. Thanks for listening!');
				message.guild.voiceConnection.dispatcher.end('end');
			} else {
				error('I\'m not playing anything?', message);
			}
		} else {
			return error('You do not have permission to end the music.\nYou need the manage guild permission.', message);
		}
	}
};
