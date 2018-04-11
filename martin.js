const Client = require('./structures/client.js');
const Dispatcher = require('./structures/dispatcher.js');
const { token } = require('./config.json');
const { oneLine } = require('common-tags');
const { updateStats } = require('./util.js');
const path = require('path');

const Handler = new Dispatcher();
const client = new Client({
	ownerId: '189696688657530880',
	prefix: 'm)',
	commandPath: path.join(__dirname, 'commands'),
	eventPath: path.join(__dirname, 'events'),
	messageCacheMaxSize: 20,
	messageCacheLifetime: 60,
	messageSweepInterval: 30,
	disabledEvents: ['TYPING_START', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE', 'USER_NOTE_UPDATE']
});

client.once('commandsLoaded', commands => console.log(`Loaded ${commands.size} commands!`));
client.once('eventsLoaded', length => console.log(`Loaded ${length} events!`));
client.once('ready', async() => {
	console.log(`Logged in as ${client.user.tag}`);
	client.user.setActivity(`${client.prefix}help | ${client.guilds.size} guilds`);

	updateStats(client);
});

client.on('message', message => Handler.handle(message));
client.on('commandRun', (command, message, args) => {
	console.log(oneLine`
		[${message.author.tag}] 
		[${command.group}:${command.name}] 
		[args: ${args}] 
		${message.guild ? `[guild: ${message.guild.name}, channel: ${message.channel.name}]` : ''}
	`);
});

client.login(token).catch(e => console.error(e));

process.on('unhandledRejection', console.error);
process.on('unhandledPromiseRejection', console.error);
