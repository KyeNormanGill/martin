const { MessageEmbed } = require('discord.js');

module.exports = function handle(client, mem) {
	const channel = mem.guild.channels.find(c => c.type === 'text' && c.topic.includes('[leave]'));
	if (!channel) return;

	const embed = new MessageEmbed()
		.setColor(0xf93535)
		.setAuthor(`${mem.user.tag} - ${mem.id}`, mem.user.avatarURL({ size: 512 }))
		.setFooter('User left')
		.setTimestamp(new Date());
	
	channel.send({ embed });
};
