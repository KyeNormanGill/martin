const Command = require('../../structures/command.js');
const { error } = require('../../util.js');

module.exports = class StopCommand extends Command {
	constructor(group) {
		super({
			name: 'stop',
			description: 'Stop the current song!.',
			guildOnly: true,
			group
		});
	}

	async run(message, args) {
		if (!message.channel.permissionsFor(message.member).has('MANAGE_GUILD') || message.client.ownerId !== message.author.id) return error('You do not have permission to end the music.\nYou need the manage guild permission.', message);
		
		const { voiceChannel } = message.guild.me;
		if (!voiceChannel) return error('I can\'t end the music if i\'m not in a voice channel.', message);
		if (!voiceChannel.members.has(message.author.id)) return error('You\'re not in the voice channel playing music.', message);

		message.client.queues.delete(message.guild.id);
		message.guild.player.stop();
	}
};