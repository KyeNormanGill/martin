const snekfetch = require('snekfetch');
const { createCanvas, Image } = require('canvas');

// Needs to be remade because idk how events work.
module.exports = async (client, oldMem, newMem) => {
	if (!newMem || !oldMem) return;
	oldMem = oldMem.member;
	newMem = newMem.member;
	if (oldMem.user.bot) return;
	if (newMem.user.presence.activity && newMem.user.presence.activity.type === 'STREAMING') {
		if (client.streamedRecently.includes(newMem.id)) return; // If users twitch notif has been posted return.

		// Add user to cache to ignore within a few hours.
		newMem.client.streamedRecently.push(newMem.id);
		setTimeout(() => {
			newMem.client.streamedRecently.splice(newMem.client.streamedRecently.indexOf(newMem.id), 1);
		}, 21600000);

		// Find all channels with twitch topic and user in the guild.
		const guilds = client.guilds.filter(guild => guild.members.has(newMem.id));
		const channels = guilds.map(guild => {
			return guild.channels.filter(chnel => chnel.type === 'text' && chnel.topic)
				.find(chnl => chnl.topic.includes('[twitch]'));
		});

		if (!channels) return console.log('no channels');


		const streamID = newMem.user.presence.activity.url.split('/').slice(3).join();
		const url = `https://api.twitch.tv/kraken/streams/${streamID}?client_id=${newMem.client.config.twitch}`;

		const { body: twitch } = await snekfetch.get(url);
		const { body: background } = await snekfetch.get(twitch.stream.preview.large);

		const canvas = createCanvas(550, 400);
		const ctx = canvas.getContext('2d');

		ctx.fillStyle = '#6441A4';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = '#ffffff';
		ctx.fillRect(16.5, 16.5, 517, 293);

		ctx.fillRect(16.5, 321, 517, 62.5);

		ctx.fillStyle = '#6441A4';
		ctx.font = '26px Arial';
		ctx.fillText(twitch.stream.channel.display_name, 30, 350);

		ctx.font = '16px Arial';
		ctx.fillText(twitch.stream.game, 30, 375);

		ctx.font = '14px Arial';
		ctx.fillText(twitch.stream.channel.status.replace(/(.{30})/g, '$1\n'), 270, 342);

		const bg = new Image();
		bg.src = background;

		ctx.drawImage(bg, 19, 19, 512, 288);
		
		channels.forEach(channel => {
			if (channel) {
				channel.send(`Go check them out! <${twitch.stream.channel.url}>`, { files: [{ attachment: canvas.toBuffer() }] })
					.catch(console.log);
			}
		});
		
		console.log(`Added ${newMem.user.username} to streamed recently`);
	}
};
