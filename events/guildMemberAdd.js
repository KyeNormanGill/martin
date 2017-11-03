const { RichEmbed } = require('discord.js');

module.exports = function handle(mem) {
	const embed = new RichEmbed()
		.setColor(0x4fdd24)
		.setAuthor(`${mem.user.tag} - ${mem.id}`, mem.user.avatarURL)
		.setFooter('User joined')
		.setTimestamp(new Date());
	const channel = mem.guild.channels.filter(chnel => chnel.type === 'text' && chnel.topic).find(chnl => chnl.topic.includes('(join)'));
	if (channel) channel.send({ embed });
};
