const { MessageEmbed } = require('discord.js');

module.exports = (client, mem) => {
	const channel = mem.guild.channels.find(c => c.type === 'text' && c.topic && c.topic.includes('[join]'));
	if (!channel) return;

	const embed = new MessageEmbed()
		.setColor(0x4fdd24)
		.setAuthor(`${mem.user.tag} - ${mem.id}`, mem.user.avatarURL({ size: 512 }))
		.setFooter('User joined')
		.setTimestamp(new Date());

	channel.send({ embed });
};
