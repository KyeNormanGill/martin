const path = require('path');
const { post } = require('snekfetch');
const { dbots, botspw } = require('./config.json');

function findUser(message, args) {
	return message.client.users.get(args)
		|| message.client.users.find(userino => userino.username.toLowerCase().includes(args.toLowerCase()))
		|| message.mentions.users.first();
}

function findMember(message, args) {
	return message.guild.members.get(args)
		|| message.guild.members.find(userino => userino.user.username.toLowerCase().includes(args.toLowerCase()))
		|| message.mentions.members.first();
}

function findChannel(message, args) {
	return message.mentions.channels.first()
		|| message.guild.channels.get(args)
		|| message.guild.channels.find(channel => channel.name.toLowerCase().includes(args.toLowerCase()));
}

function stripPath(pathName, extension) {
	return path.basename(pathName, `.${extension}`);
}

function error(errorText, message) {
	if (message === undefined) throw Error('Message undefined in error call.');
	message.channel.send(`<:error:353927476885585930> | ${errorText}`);
}

function allTrue(array) {
	return array.every(i => i);
}

function updateStats(client) {
	post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
		.set('Authorization', dbots)
		.send({ server_count: client.guilds.size }) // eslint-disable-line camelcase
		.end();

	post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
		.set('Authorization', botspw)
		.send({ server_count: client.guilds.size }) // eslint-disable-line camelcase
		.end();

	client.user.setActivity(`${client.prefix}help | ${client.guilds.size} guilds`);
}

exports.allTrue = allTrue;
exports.findUser = findUser;
exports.findChannel = findChannel;
exports.stripPath = stripPath;
exports.error = error;
exports.findMember = findMember;
exports.updateStats = updateStats;
