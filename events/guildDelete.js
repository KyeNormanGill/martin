const { MessageEmbed } = require('discord.js');
const { updateStats } = require('../util.js');

module.exports = function handle(client, guild) {
	const embed = new MessageEmbed()
		.setColor(0xf93535)
		.setThumbnail(guild.iconURL)
		.setDescription(`**Owner**: ${guild.owner.user.tag}\n**Region**: ${guild.region}\n**Channels**: ${guild.channels.size}`)
		.setTitle(guild.name)
		.setFooter('Left guild')
		.setTimestamp(new Date());
	guild.client.channels.get('379222540155092993').send({ embed });

	updateStats(guild.client);
};
