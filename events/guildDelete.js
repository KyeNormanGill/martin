const { RichEmbed } = require('discord.js');

module.exports = function handle(guild) {
	const embed = new RichEmbed()
		.setColor(0xf93535)
		.setThumbnail(guild.iconURL)
		.setTitle(guild.name)
		.setFooter('Left guild')
		.setTimestamp(new Date());
	guild.client.channels.get('379222540155092993').send({ embed });
};
