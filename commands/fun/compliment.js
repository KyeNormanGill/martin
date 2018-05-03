const Command = require('../../structures/command.js');
const { find } = require('../../util.js');
const compliments = [
	'You\'re my kind of weird.',
	'I love you more than tea.',
	'You are wonderfully odd.',
	'You are the last minute goal in the cup final.',
	'You\'re tougher than my wifi password.',
	'You are a walking high-five.',
	'You\'d win the Saturday Kitchen omelette challenge.',
	'You could be a part-time model.',
	'I like your face.',
	'You\'re wise and all knowing, like a mighty owl.',
	'You are more fun than anyone or anything I know, including bubble wrap.',
	'You are the most perfect you there is.',
	'You are enough.',
	'You are one of the strongest people I know.',
	'You look great today.',
	'You just light up the room.',
	'You are always so helpful.',
	'I appreciate our friendship.',
	'Your inside is even more beautiful than your outside.',
	'I love the way you bring out the best in people.',
	'You bring out the best in the rest of us.',
	'You just made my day.',
	'You make me float up like I’m on millions of bubbles.',
	'I am a better person because of you.',
	'You have taught me so much.',
	'You make me want to be a better person.',
	'Everything seems brighter when you are around.',
	'I know that you will always have my back, because that is the kind of person you are.',
	'You have amazing creative potential.',
	'You are the reason I am smiling today.',
	'You have a gift for making people comfortable.',
	'I tell everyone how amazing you are.'
];

const prefixs = [
	'you know what?',
	'hey you!',
	'guess what.'
];

module.exports = class ComplimentCommand extends Command {
	constructor(group) {
		super({
			name: 'compliment',
			description: 'Compliment a user.',
			group
		});
	}

	run(message, args) {
		let user = find.User(message, args);

		if (!user || user.id === message.client.id) user = message.author;
		message.channel.send(`${user}, ${prefixs[Math.floor(Math.random() * prefixs.length)]} ${compliments[Math.floor(Math.random() * compliments.length)]}`);
	}
};
