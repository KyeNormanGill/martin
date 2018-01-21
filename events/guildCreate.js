const { MessageEmbed } = require('discord.js');
const { updateStats } = require('../util.js');

module.exports = function handle(client, guild) {
	const embed = new MessageEmbed()
		.setColor(0x4fdd24)
		.setThumbnail(guild.iconURL)
		.setTitle(guild.name)
		.setDescription(`**Owner**: ${guild.owner.user.tag}\n**Region**: ${guild.region}\n**Channels**: ${guild.channels.size}`)
		.setFooter('Joined guild')
		.setTimestamp(new Date());
	guild.client.channels.get('379222540155092993').send({ embed });

	updateStats(guild.client);
};
