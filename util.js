const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const { post } = require('snekfetch');
const config = require('./config.json');
const readdir = promisify(fs.readdir);

module.exports = {
	findUser: (message, args) => {
		return message.client.users.get(args)
			|| message.client.users.find(userino => userino.username.toLowerCase().includes(args.toLowerCase()))
			|| message.mentions.users.first();
	},
	findMember: (message, args) => {
		return message.guild.members.get(args)
			|| message.guild.members.find(userino => userino.user.username.toLowerCase().includes(args.toLowerCase()))
			|| message.mentions.members.first();
	},
	findChannel: (message, args) => {
		return message.mentions.channels.first()
			|| message.guild.channels.get(args)
			|| message.guild.channels.find(channel => channel.name.toLowerCase().includes(args.toLowerCase()));
	},
	stripPath: (pathName, extension) => {
		return path.basename(pathName, `.${extension}`);
	},
	error: (errorText, message) => {
		if (message === undefined) throw Error('Message undefined in error call.');
		message.channel.send(`<:error:353927476885585930> | ${errorText}`);
	},
	allTrue: array => {
		return array.every(i => i);
	},
	updateStats: async client => {
		post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
			.set('Authorization', config.keys.dbots)
			.send({ server_count: client.guilds.size }) // eslint-disable-line camelcase
			.end();

		post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
			.set('Authorization', config.keys.botspw)
			.send({ server_count: client.guilds.size }) // eslint-disable-line camelcase
			.end();

		client.user.setActivity(`${client.prefix}help | ${client.guilds.size} guilds`);
	},
	init: async client => {
		setTimeout(() => {
			client.lavalink.connect('ws://lavalink:8080');
			console.log('Lavalink connected!');
		}, 5000);

		const groups = await readdir(client.commandPath);

		for (const group of groups) {
			const commands = await readdir(path.join(client.commandPath, group)); // eslint-disable-line
			client.groups.set(group, []);
			for (const command of commands) {
				const Command = require(path.join(client.commandPath, group, command));
				const cmd = new Command(group);

				client.commands.set(cmd.name, cmd);
				client.groups.get(group).push(cmd);
			}
		}
		console.log(`Loaded ${client.commands.size} commands!`)

		const events = await readdir(client.eventPath);
		for (const event of events) {
			console.log(`Loaded ${event}`);
			client.on(event.replace('.js', ''), (...args) => require(path.join(client.eventPath, event))(client, ...args));
		}
		console.log(`Loaded ${events.size} commands!`);
	}
};
