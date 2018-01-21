const { Client, Collection } = require('discord.js');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

class Martin extends Client {
	constructor(options = {}) {
		super(options);

		this.ownerId = options.ownerId;
		this.prefix = options.prefix;
		this.commandPath = options.commandPath;
		this.eventPath = options.eventPath;
		this.streamedRecently = [];
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

			const events = await readdir(this.eventPath);
			for (const event of events) {
				console.log(`Loaded ${event}`);
				this.on(event.replace('.js', ''), (...args) => require(path.join(this.eventPath, event))(this, ...args));
			}

			this.emit('eventsLoaded', events.length);
		});
	}
}

module.exports = Martin;
