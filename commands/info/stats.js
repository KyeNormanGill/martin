const Command = require('../../structures/command.js');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');
require('moment-duration-format');
const { colour } = require('../../config.json');

module.exports = class StatsCommand extends Command {
	constructor(group) {
		super({
			name: 'stats',
			description: 'Shows stats about the bot.',
			aliases: ['statistics', 'info'],
			perms: ['EMBED_LINKS'],
			group: group
		});
	}

	run(message) {
		const embed = new MessageEmbed();
		embed.setColor(colour)
			.setTitle('Stats')
			.setThumbnail(message.client.user.avatarURL)
			.addField('__**Martin Stats**__', stripIndents`
				**Uptime:** ${moment.duration(message.client.uptime).format('d[ days], h[ hours], m[ minutes, and ]s[ seconds]')}
				**Memory usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
				**Ping:** ${Math.round(message.client.ping)}ms
				**Guilds:** ${message.client.guilds.size}
				**Users:** ${message.client.guilds.reduce((p, c) => p + c.memberCount, 0)}
			`)
			.addField('__**Creator**__', stripIndents`
				**Github:** [KyeNormanGill](https://github.com/KyeNormanGill)
				**Twitter:** [@GillKye](https://twitter.com/GillKye)
				**Youtube:** [@Artful](https://www.youtube.com/channel/UCNRTR32vS6MoMEudc5VZKng)
			`);
		message.channel.send({ embed });
	}
};
