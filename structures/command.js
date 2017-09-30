class Command {
	constructor(options = {}) {
		if (options.name === undefined) throw Error('No name property detected in command.');
		if (options.description === undefined) throw Error('No description detected in command.');
		if (options.guildOnly === undefined) options.guildOnly = false;
		if (options.aliases === undefined) options.aliases = [];
		if (!Array.isArray(options.aliases)) throw Error('Aliases must be an Array.');
		if (options.ownerOnly === undefined) options.ownerOnly = false;
		if (options.perms === undefined) options.perms = [];
		if (!Array.isArray(options.perms)) throw Error('Permissions must be an Array.');
		if (options.group === undefined) throw Error(`${options.name} has no group`);

		this.name = options.name;
		this.description = options.description;
		this.guildOnly = options.guildOnly;
		this.ownerOnly = options.ownerOnly;
		this.aliases = options.aliases;
		this.perms = options.perms;
		this.group = options.group;
	}
}

module.exports = Command;
