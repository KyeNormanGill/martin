const Command = require('../../structures/command.js');
const { colour, osuKey } = require('../../config.json');
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

		const { body } = await get(`https://osu.ppy.sh/api/get_user?k=${osuKey}&u=${args}`);

		if (!body.length) return error('No user found!', message);

		const embed = new MessageEmbed()
			.setColor(colour)
			.setAuthor(`${body[0].username} (${body[0].user_id})`, `http://a.ppy.sh/${body[0].user_id}`)
			.setThumbnail(`http://a.ppy.sh/${body[0].user_id}`)
			.addField('\u200B', stripIndents`
				**Level:** ${parseFloat(body[0].level).toFixed(0)}
				**Rank:** ${body[0].pp_rank}
				**Total Score:** ${body[0].total_score}
				**PP:** ${parseFloat(body[0].pp_raw).toFixed(0)}
				**Accuracy:** ${parseFloat(body[0].accuracy).toFixed(2)}
			`, true)
			.addField('\u200B', stripIndents`
				**SS:** ${body[0].count_rank_ss}
				**S:** ${body[0].count_rank_s}
				**A:** ${body[0].count_rank_a}
			`, true)
			.setFooter(`Country: ${body[0].country}`)
			.setTimestamp();

		message.channel.send({ embed });
	}
};
