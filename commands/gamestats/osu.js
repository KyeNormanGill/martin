const Command = require('../../structures/command.js');
const config = require('../../config.json');
const { error } = require('../../util.js');
const { MessageEmbed } = require('discord.js');
const { get } = require('snekfetch');
const { stripIndents } = require('common-tags');

module.exports = class OsuCommand extends Command {
	constructor(group) {
		super({
			name: 'osu',
			description: 'Find osu data on a user.',
			guildOnly: true,
			aliases: ['game that makes you rage so hard you smack your desk'],
			perms: ['EMBED_LINKS'],
			group: group
		});
	}

	async run(message, args) {
		if (!args) return error('Please specify a user to lookup!', message);

		const { body } = await get(`https://osu.ppy.sh/api/get_user?k=${config.keys.osuKey}&u=${args}`);

		if (!body.length) return error('No user found!', message);

		const embed = new MessageEmbed()
			.setColor(config.colour)
			.setAuthor(`${body[0].username} (${body[0].user_id})`, `http://a.ppy.sh/${body[0].user_id}`)
			.setThumbnail(`http://a.ppy.sh/${body[0].user_id}`)
			.addField('Stats', stripIndents`
				**Level:** ${parseFloat(body[0].level).toFixed(0)}
				**Rank:** ${body[0].pp_rank}
				**PP:** ${parseFloat(body[0].pp_raw).toFixed(0)}
				**Accuracy:** ${parseFloat(body[0].accuracy).toFixed(2)}
				**Total Score:** ${body[0].total_score}
			`, true)
			.addField('Medals', stripIndents`
				**SS:** ${body[0].count_rank_ss}
				**S:** ${body[0].count_rank_s}
				**A:** ${body[0].count_rank_a}
			`, true)
			.setFooter(`Country: ${body[0].country}`)
			.setTimestamp();

		message.channel.send({ embed });
	}
};
