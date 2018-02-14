const { MessageEmbed } = require('discord.js');

module.exports = function handle(client, mem) {
	const embed = new MessageEmbed()
		.setColor(0x4fdd24)
		.setAuthor(`${mem.user.tag} - ${mem.id}`, mem.user.avatarURL({ size: 512 }))
		.setFooter('User joined')
		.setTimestamp(new Date());
	const channel = mem.guild.channels.filter(chnel => chnel.type === 'text' && chnel.topic).find(chnl => chnl.topic.includes('[join]'));
	if (channel) channel.send({ embed });
};
