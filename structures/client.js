const { Client, Collection } = require('discord.js');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const options = {
	ownerId: '189696688657530880',
	prefix: 'm$',
	commandPath: path.join(__dirname, '..', 'commands')
};

class Martin extends Client {
	constructor() {
		super(options);

		this.ownerId = options.ownerId;
		this.prefix = options.prefix;
		this.commandPath = options.commandPath;
		this.commands = new Collection();
		this.groups = new Collection();
		this.queues = new Collection();

		// Needs refactoring.
		this.experience = new Collection();
		this.money = new Collection();

		this.once('ready', async() => {
			const readdir = promisify(fs.readdir);
			const groups = await readdir(this.commandPath);

			for (const group of groups) {
				const commands = await readdir(path.join(this.commandPath, group)); // eslint-disable-line
				this.groups.set(group, []);
				for (const command of commands) {
					const Command = require(path.join(this.commandPath, group, command));
					const cmd = new Command(group);

					this.commands.set(cmd.name, cmd);
					this.groups.get(group).push(cmd);
				}
			}

			this.emit('commandsLoaded', this.commands);
		});
	}
}

module.exports = Martin;
