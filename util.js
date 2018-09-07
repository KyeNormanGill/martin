const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const { post } = require('snekfetch');
const readdir = promisify(fs.readdir);

module.exports = {
	find: {
		User(message, args) {
			return  message.mentions.users.first()
				|| message.client.users.get(args)
				|| message.client.users.find(userino => userino.username.toLowerCase().includes(args.toLowerCase()));
		},
		Member(message, args) {
			return message.mentions.members.first()
				|| message.guild.members.get(args)
				|| message.guild.members.find(userino => userino.user.username.toLowerCase().includes(args.toLowerCase()));
		},
		Channel(message, args) {
			return message.mentions.channels.first()
				|| message.guild.channels.get(args)
				|| message.guild.channels.find(channel => channel.name.toLowerCase().includes(args.toLowerCase()));
		}
	},
	error: (errorText, message) => {
		if (message === undefined) throw Error('Message undefined in error call.');
		message.channel.send(`<:error:353927476885585930> | ${errorText}`);
	},
	updateStats: async client => {
		try {
			await post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
				.set('Authorization', client.config.dbots)
				.send({ server_count: client.guilds.size }) // eslint-disable-line camelcase
				.end();
	
			await post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
				.set('Authorization', client.config.botspw)
				.send({ server_count: client.guilds.size }) // eslint-disable-line camelcase
				.end();
		} catch (e) {
			console.log('Failed bot count upload');
		}

		client.user.setActivity(`${client.prefix}help | ${client.guilds.size} guilds`);

	},
	init: async client => {
		const events = await readdir(client.eventPath);
		for (const event of events) {
			console.log(event.replace('.js', ''));
			client.on(event.replace('.js', ''), (...args) => require(path.join(client.eventPath, event))(client, ...args));
		}
		console.log(`Loaded ${events.length} events!`);

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
		console.log(`Loaded ${client.commands.size} commands!`);
	}
};
