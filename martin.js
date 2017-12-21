const { User } = require('discord.js');

// Needs refactoring.
Object.defineProperty(User.prototype, 'money', {
	get: function() { return client.money.get(this.id); }, // eslint-disable-line
	set: function(value) { client.money.set(this.id, value); } // eslint-disable-line
});

Object.defineProperty(User.prototype, 'experience', {
	get: function() { return client.experience.get(this.id); }, // eslint-disable-line
	set: function(value) { client.experience.set(this.id, value); } // eslint-disable-line
});

const Client = require('./structures/client.js');
const Dispatcher = require('./structures/dispatcher.js');
const { token } = require('./config.json');
const { oneLine } = require('common-tags');
const db = require('./database/sqlite.js');
const Users = require('./database/models/Users.js');
const { updateStats } = require('./util.js');

const Handler = new Dispatcher();
const client = new Client();

client.on('commandsLoaded', commands => console.log(`Loaded ${commands.size}`));
client.on('message', message => Handler.handle(message));

client.on('commandRun', (command, message, args) => {
	console.log(oneLine`
		[${message.author.tag}] 
		[${command.group}:${command.name}] 
		[args: ${args}] 
		${message.guild ? `[guild: ${message.guild.name}, channel: ${message.channel.name}]` : ''}
	`);
});

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
	client.user.setPresence({ game: { name: `${client.prefix}help | ${client.guilds.size} guilds`, type: 0 } });

	db.sync().then(() => {
		Users.findAll().then(users => {
			users.forEach(user => {
				const person = client.users.get(user.UserId);
				if (person) {
					person.money = user.Money;
					person.experience = user.Experience;
				}
			});
		});
	});

	setInterval(() => {
		client.users.forEach(user => {
			if (user.money) {
				Users.upsert({ UserId: user.id, Money: user.money, Experience: user.experience });
			}
		});
	}, 600000);

	updateStats(client);
});

client.on('voiceStateUpdate', (oldMem, newMem) => require('./events/voiceStateUpdate.js')(oldMem, newMem));
client.on('presenceUpdate', (oldMem, newMem) => require('./events/presenceUpdate.js')(oldMem, newMem));
client.on('guildMemberRemove', mem => require('./events/guildMemberRemove.js')(mem));
client.on('guildMemberAdd', mem => require('./events/guildMemberAdd.js')(mem));
client.on('guildCreate', guild => require('./events/guildCreate.js')(guild));
client.on('guildDelete', guild => require('./events/guildDelete.js')(guild));

client.login(token).catch(console.error);
