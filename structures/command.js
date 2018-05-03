module.exports = class Command {
	constructor(options = {}) {
		if (!options.description) throw Error('No description detected in command.');
		if (!options.name) throw Error('No name property detected in command.');
		if (!options.group) throw Error(`${options.name} has no group`);
		if (!options.guildOnly) options.guildOnly = false;
		if (!options.ownerOnly) options.ownerOnly = false;
		if (!options.aliases) options.aliases = [];
		if (!options.perms) options.perms = [];

		this.name = options.name;
		this.description = options.description;
		this.guildOnly = options.guildOnly;
		this.ownerOnly = options.ownerOnly;
		this.aliases = options.aliases;
		this.perms = options.perms;
		this.group = options.group;
	}
}
