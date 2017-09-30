const Command = require('../../structures/command.js');
const path = require('path');
const { createCanvas, Image, registerFont } = require('canvas');
const { get } = require('snekfetch');
const { error, findMember } = require('../../util.js');

registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'NotoSans-Regular.ttf'), { family: 'NotoSans' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'NotoSans-Bold.ttf'), { family: 'NotoSansBold' });

module.exports = class ProfileCommand extends Command {
	constructor(group) {
		super({
			name: 'profile',
			description: 'See your profile as an image!',
			guildOnly: true,
			aliases: ['p', 'bio'],
			group: group
		});
	}

	async run(message, args) {
		let mem = message.member;

		if (args) {
			mem = findMember(message, args);
			if (!mem) return error('No user found!', message);
		}

		const people = message.client.users.filter(p => p.experience).sort((a, b) => b.experience - a.experience);
		const rank = people.array().findIndex(p => p.experience === mem.user.experience) + 1;

		const canvas = createCanvas(800, 200);
		const ctx = canvas.getContext('2d');

		// Fetch avatar from discord.
		const { body: avatar } = await get(mem.user.displayAvatarURL);
		const cAvatar = new Image();
		cAvatar.src = avatar;

		// Background as role colour.
		ctx.fillStyle = mem.displayHexColor;
		ctx.fillRect(0, 0, 800, 200);

		// White background with drop shadow.
		ctx.shadowBlur = 20;
		ctx.shadowColor = 'black';
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(10, 10, 780, 180);
		ctx.shadowBlur = 0;

		// Draw users avatar.
		ctx.drawImage(cAvatar, 20, 20, 160, 160);

		// Draw opaque overlay.
		ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		ctx.fillRect(20, 140, 160, 40);

		// Draw username.
		ctx.fillStyle = '#ffffff';
		ctx.textAlign = 'center';
		ctx.font = '20px NotoSansBold';
		ctx.fillText(mem.user.username, 100, 167);

		// Stats name and positions.
		const bottomPos = [
			[['Currency', `$${mem.user.money || 0}`], [280, 172], [280, 150]],
			[['Experience', mem.user.experience || 0], [480, 172], [480, 150]],
			[['Global rank', `#${rank || '-'}`], [680, 172], [680, 150]]
		];
		const level = Math.floor(0.7 * Math.sqrt(mem.user.experience)) + 1;

		// Draw stats.
		for (let i = 0; i < bottomPos.length; i++) {
			ctx.font = '20px NotoSans';
			ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
			ctx.fillText(bottomPos[i][0][0], bottomPos[i][1][0], bottomPos[i][1][1]);
			ctx.fillStyle = '#292929';
			ctx.font = '28px NotoSans';
			ctx.fillText(bottomPos[i][0][1], bottomPos[i][2][0], bottomPos[i][2][1]);
		}

		ctx.font = '100px NotoSansBold';
		ctx.fillText(level, 280, 105);

		ctx.fillStyle = '#515151';
		ctx.fillRect(370, 50, 400, 40);

		ctx.fillStyle = '#ffffff';
		ctx.fillRect(372.5, 52.5, 395, 35);

		ctx.fillStyle = '#29e582';
		const value = Math.min(Math.max(50 / 100, 0), 1);
		ctx.fillRect(372.5, 52.5, value * 395, 35);

		ctx.fillStyle = '#292929';
		ctx.font = '28px NotoSans';
		ctx.fillText(`${mem.user.experience || 0} / 40,000`, 570, 80);

		await message.channel.send('This command is WIP (work in progress)');
		await message.channel.send({ files: [{ attachment: canvas.toBuffer() }] });
	}
};
