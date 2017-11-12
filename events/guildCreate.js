const { RichEmbed } = require('discord.js');

module.exports = function handle(guild) {
	const embed = new RichEmbed()
		.setColor(0x4fdd24)
		.setThumbnail(guild.iconURL)
		.setTitle(guild.name)
		.setFooter('Joined guild')
		.setTimestamp(new Date());
	guild.client.channels.get('379222540155092993').send({ embed });
};
