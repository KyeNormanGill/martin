// Builtins
const path = require('path');

// Structures
const Client = require('./structures/client.js');

// Other
const { init } = require('./util.js');
const { token } = require('./config.json');

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

init(client);

client.login(token).catch(e => console.error(e));

process.on('unhandledRejection', console.error);
process.on('unhandledPromiseRejection', console.error);
