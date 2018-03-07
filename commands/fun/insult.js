const Command = require('../../structures/command.js');
const { findUser } = require('../../util.js');
const insults = [
	'You have a room temperature IQ - if the room is in Antarctica.',
	'You have two parts of brain, \'left\' and \'right\'. In the left side, there\'s nothing right. In the right side, there\'s nothing left.',
	'It\'s better to let someone think you are an Idiot than to open your mouth and prove it.',
	'You\'re old enough to remember when emojis were called "hieroglyphics."',
	'Is your ass jealous of the amount of shit that just came out of your mouth?',
	'If I wanted to kill myself I\'d climb your ego and jump to your IQ.',
	'Two wrongs don\'t make a right, take your parents as an example.',
	'Your family tree must be a cactus because everybody on it is a prick.',
	'Your birth certificate is an apology letter from the condom factory.',
	'You must have been born on a highway because that\'s where most accidents happen.',
	'You\'re so ugly, when your mom dropped you off at school she got a fine for littering.',
	'I had prepared for a battle of wits but I see you came unarmed.',
	'If laughter is the best medicine, your face must be curing the world.',
	'I\'d like to see things from your point of view but I can\'t seem to get my head that far up my ass.',
	'The only way you\'ll ever get laid is if you crawl up a chicken\'s ass and wait.',
	'It looks like your face caught on fire and someone tried to put it out with a hammer.',
	'I\'m jealous of all the people that haven\'t met you!',
	'There\'s only one problem with your face, I can see it.',
	'If I had a face like yours, I\'d sue my parents.',
	'Stupidity is not a crime so you are free to go.',
	'Hey, you have something on your chin... no, the 3rd one down.',
	'I would ask you how old you are but I know you can\'t count that high.',
	'If you really want to know about mistakes, you should ask your parents.',
	'You\'re so fake, Barbie is jealous.',
	'Aha, I see the Fuck-Up Fairy has visited us again!',
	'I love what you\'ve done with your hair. How do you get it to come out of the nostrils like that?',
	'You\'re the reason the gene pool needs a lifeguard.'
];

const prefixs = [
	'you know what?',
	'hey you!'
];

module.exports = class InsultCommand extends Command {
	constructor(group) {
		super({
			name: 'insult',
			description: 'Insult a user.',
			group: group
		});
	}

	run(message, args) {
		let user = findUser(message, args);

		if (!user || user.id === message.client.id) user = message.author;
		message.channel.send(`${user}, ${prefixs[Math.floor(Math.random() * prefixs.length)]} ${insults[Math.floor(Math.random() * insults.length)]}`);
	}
};
