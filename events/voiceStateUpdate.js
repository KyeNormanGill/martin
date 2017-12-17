module.exports = function handle(oldMem, newMem) {
	if (!oldMem.guild.me.voiceChannel) return;

	if (oldMem.voiceChannel === oldMem.guild.me.voiceChannel && newMem.voiceChannel !== newMem.guild.me.voiceChannel && newMem.guild.me.voiceChannel.members.size === 1) {
		const voiceChannel = newMem.guild.me.voiceChannel;
		newMem.guild.voiceConnection.dispatcher.end('endAll');
		newMem.user.client.playlists.delete(newMem.guild.id);
		voiceChannel.leave();
		newMem.send('There\'s no one left to listen to music. Shutting off!');
	}
};
