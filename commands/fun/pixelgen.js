const Command = require('../../structures/command.js');
const { error } = require('../../util.js');
const { createCanvas } = require('canvas');
const { performance } = require('perf_hooks');
const { get } = require('snekfetch');

module.exports = class PixelGenCommand extends Command {
	constructor(group) {
		super({
			name: 'pixelgen',
			description: 'Generate an image using text.',
			aliases: ['pixel', 'gen'],
			example: 'm)pixelgen #f6f6f6,#000000,#30df8b,#1b9c5e,#ffffff,#eeca85;1,1,1,1,1,2,2,2,2,1,1,1,1,1;1,1,1,2,2,3,3,3,3,2,2,1,1,1;1,1,2,3,3,3,3,3,3,3,3,2,1,1;1,2,3,3,3,3,3,3,3,3,3,3,2,1;1,2,3,5,2,3,3,3,3,5,2,3,2,1;2,3,4,2,2,3,3,3,3,2,2,4,3,2;2,3,4,4,3,3,2,2,3,3,4,4,3,2;2,3,3,3,3,3,3,3,3,3,3,3,3,2;2,3,3,3,3,3,3,3,3,3,3,3,3,2;1,2,2,3,3,2,2,2,2,3,3,2,2,1;1,2,6,2,2,6,6,6,6,2,2,6,2,1;1,2,6,6,6,6,6,6,6,6,6,6,2,1;1,1,2,2,2,2,2,2,2,2,2,2,1,1;1,1,2,6,6,6,6,6,6,6,6,2,1,1;1,1,1,2,6,6,6,6,6,6,2,1,1,1;1,1,1,2,6,6,6,6,6,6,2,1,1,1;1,1,1,1,2,6,6,6,6,2,1,1,1,1;1,1,1,1,2,6,6,6,6,2,1,1,1,1;1,1,1,1,1,2,6,6,2,1,1,1,1,1;1,1,1,1,1,1,2,2,1,1,1,1,1,1',
			group
		});
	}

	async run(message, args) {
		let payload;
		const time1 = performance.now();

		if (message.content.includes('hastebin.com/raw')) {
			const { body } = await get(args);
			payload = body.toString().split(';');
		} else {
			payload = args.split(';');
		}

		const colours = payload[0].split(',');
		const positions = [];
		for (let i = 1; i < payload.length; i++) {
			positions.push(payload[i].split(','))
		}

		const canvas = createCanvas(positions[0].length * 30, positions.length * 30);
		const ctx = canvas.getContext('2d');

		for (let o = 0; o < positions.length; o++) {
			for (let i = 0; i < positions[o].length; i++) {
				if (!colours[(positions[o][i] - 1)]) return error(`Colour in position ${(positions[o][i])} does not exist.\nNeed help? Use m)help pixelgen!`, message);
				ctx.fillStyle = colours[(positions[o][i] - 1)];
				ctx.fillRect(i * 30, o * 30, 30, 30);
			}
		}

		await message.channel.send(`Generated image took: ${Math.round(performance.now() - time1)} milliseconds`,{ files: [{ attachment: canvas.toBuffer() }] });
	}
};
