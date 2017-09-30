const path = require('path');
const Discord = require('discord.js');

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

exports.allTrue = allTrue;
exports.findUser = findUser;
exports.findChannel = findChannel;
exports.stripPath = stripPath;
exports.error = error;
exports.findMember = findMember;
