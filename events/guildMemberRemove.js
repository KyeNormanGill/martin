const { RichEmbed } = require('discord.js');

module.exports = function handle(mem) {
	const embed = new RichEmbed()
		.setColor(0xf93535)
		.setAuthor(`${mem.user.tag} - ${mem.id}`, mem.user.avatarURL)
		.setFooter('User left')
		.setTimestamp(new Date());
	const channel = mem.guild.channels.filter(chnel => chnel.type === 'text' && chnel.topic).find(chnl => chnl.topic.includes('(leave)'));
	if (channel) channel.send({ embed });
};
