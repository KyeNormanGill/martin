const snekfetch = require('snekfetch');
const { twitch: twitchKey } = require('../config.json').keys;
const Canvas = require('canvas');

module.exports = async function handle(oldMem, newMem) {
	const channel = newMem.guild.channels.filter(chnel => chnel.type === 'text' && chnel.topic)
		.find(chnl => chnl.topic.includes('(twitch)'));
	if (!channel) return;

	if (newMem.user.presence.game && newMem.user.presence.game.streaming && !newMem.client.streamedRecently.includes(newMem.id)) {
		const streamID = newMem.user.presence.game.url.split('/').slice(3).join();
		const url = `https://api.twitch.tv/kraken/streams/${streamID}?client_id=${twitchKey}`;

		const { body: twitch } = await snekfetch.get(url);
		const { body: background } = await snekfetch.get(twitch.stream.preview.large);

		const canvas = new Canvas(550, 400);
		const ctx = canvas.getContext('2d');
		const { Image } = Canvas;

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

		channel.send(`Go check them out! <${twitch.stream.channel.url}>`, { files: [{ attachment: canvas.toBuffer() }] })
			.then(() => {
				console.log(`Added ${newMem.username} to streamed recently`);
				newMem.client.streamedRecently.push(newMem.id);

				setTimeout(() => {
					newMem.client.streamedRecently.splice(newMem.client.streamedRecently.indexOf(newMem.id), 1);
				}, 21600000);
			}).catch(console.error);
	}
};
