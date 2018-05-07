const Command = require('../../structures/command.js');
const { keys } = require('../../config.json');
const { error } = require('../../util.js');
const snekfetch = require('snekfetch');
const { createCanvas, Image, registerFont } = require('canvas');
const timezone = require('moment-timezone');
const path = require('path');

registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'NotoSans-Regular.ttf'), { family: 'NotoSans' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'NotoSans-Bold.ttf'), { family: 'NotoSansBold' });

module.exports = class WeatherCommand extends Command {
	constructor(group) {
		super({
			name: 'weather',
			description: 'Displays the weather of where you specify.',
			aliases: ['w', 'forecast'],
			perms: ['ATTACH_FILES'],
			group
		});
	}

	_getIcon(icon) {
		if (icon === 'clear-day' || icon === 'partly-cloudy-day') {
			return 'clear';
		} else if (icon === 'clear-night' || icon === 'partly-cloudy-night') {
			return 'night';
		} else if (icon === 'rain' || icon === 'thunderstorm') {
			return 'rain';
		} else if (icon === 'snow' || icon === 'sleet' || icon === 'fog') {
			return 'snow';
		} else if (icon === 'wind' || icon === 'tornado') {
			return 'night';
		} else if (icon === 'cloudy') {
			return 'cloudy';
		} else {
			return 'night';
		}
	}

	_convertFToC(temp) {
		return Math.round((temp - 32) * 0.5556);
	}

	async run(message, args) {
		if (!args) return error('Please specify a place to look for weather', message);

		const { body: location } = await snekfetch.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${args}&key=${message.client.config.google}`);

		if (location.status !== 'OK') {
			switch (location.status) {
				case 'ZERO_RESULTS':
					return message.channel.send('No results found');
				case 'REQUEST_DENIED':
					return message.channel.send('Request denied');
				case 'INVALID_REQUEST':
					return message.channel.send('Invalid request');
				case 'OVER_QUERY_LIMIT':
					return message.channel.send('Over limit');
				case 'UNKNOWN_ERROR':
					return message.channel.send('An unkown error has occured');
			}
		}

		const results = location.results[0];

		const latitude = results.geometry.location.lat;
		const longitude = results.geometry.location.lng;

		const locality = results.address_components.find(loc => loc.types.includes('locality'));
		const governing = results.address_components.find(gov => gov.types.includes('administrative_area_level_1'));
		const country = results.address_components.find(cou => cou.types.includes('country'));
		const continent = results.address_components.find(con => con.types.includes('continent'));

		const city = locality || governing || country || continent || {};

		const { body: weather } = await snekfetch.get(`https://api.darksky.net/forecast/${message.client.config.darksky}/${latitude},${longitude}`);

		const canvas = createCanvas(800, 250);
		const ctx = canvas.getContext('2d');

		const icon = new Image();
		const background = new Image();

		icon.src = path.join(__dirname, '..', '..', 'assets', 'images', `${this._getIcon(weather.currently.icon)}.png`);
		background.src = path.join(__dirname, '..', '..', 'assets', 'images', 'weatherbg.png');

		ctx.drawImage(background, 0, 0);

		ctx.fillStyle = '#ffffff';
		ctx.font = '22px NotoSans';
		ctx.fillText(city.long_name || 'Unknown', 30, 40);

		ctx.fillStyle = '#ffffff';
		ctx.fillRect(275, 30, 1, canvas.height - 60);

		ctx.fillStyle = '#ffffff';
		ctx.font = '70px NotoSans';
		ctx.fillText(`${this._convertFToC(weather.currently.temperature)}°`, 80, 205);

		ctx.drawImage(icon, 80, 40, 90, 90);

		const timePlacements = [[365, 60], [475, 60], [595, 60], [705, 60]];

		const minPlacements = [[365, 170], [475, 170], [595, 170], [705, 170]];

		const maxPlacements = [[365, 210], [475, 210], [595, 210], [705, 210]];

		const imagePlacements = [[330, 70], [440, 70], [560, 70], [670, 70]];

		for (let i = 0; i < 4; i++) {
			const Time = timezone().tz(weather.timezone).add(parseInt(i) + 1, 'days').format('ddd');
			const Min = this._convertFToC(weather.daily.data[i].temperatureMin);
			const Max = this._convertFToC(weather.daily.data[i].temperatureMax);

			const newImage = new Image();
			newImage.src = path.join(__dirname, '..', '..', 'assets', 'images', `${this._getIcon(weather.daily.data[i].icon)}.png`);
			ctx.drawImage(newImage, imagePlacements[i][0], imagePlacements[i][1], 60, 60);

			ctx.textAlign = 'center';
			ctx.fillStyle = '#ffffff';
			ctx.font = '25px NotoSans';
			ctx.fillText(Time, timePlacements[i][0], timePlacements[i][1]);

			ctx.fillStyle = '#ffffff';
			ctx.font = '25px NotoSans';
			ctx.fillText(Min, minPlacements[i][0], minPlacements[i][1]);

			ctx.fillStyle = '#ffffff';
			ctx.font = '25px NotoSans';
			ctx.fillText(Max, maxPlacements[i][0], maxPlacements[i][1]);
		}

		message.channel.send({ files: [{ attachment: canvas.toBuffer() }] });
	}
};
