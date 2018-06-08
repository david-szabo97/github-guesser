const thinking = [
	'<div>WHICH ONE HAS MOAAAAR <span>STARS</span>????</div>',
	'WHADDAYA THINK?',
	'Nyanpasu?',
	'???',
	'Okay lets do this!',
	'So we have a question',
	'I don\'t remember askin\' you a goddam thing!',
	'Vincent, are we happy?',
	'Your choice?',
	'DELATA FORMATION',
	'Ah, hello! You don\'t look Hollow, far from it!'
];

const selected = [
	'Let\'s see...',
	'Hmm...',
	'Nyanpasu...',
	'...',
	'LEEEEEEEEROY JENKINS!!!!!',
	'Please choose an answer',
	'SAY "what" again! I dare you! I double dare you!',
	'(No response)',
	'You are imaginative aren\'t you?',
	'I BELIEVE IN OUR FORMATION',
	'I have come to this great land, to seek my very own sun!'
];

const winner = [
	'GOOD JOB BOIIII',
	'BRING IT ON CHAMP!!!',
	'NyAAAApasu',
	'YEY!!!',
	'CHICKEN!',
	'┬─┬ ノ( ゜-゜ノ)',
	'Good boy!',
	'Yeah, we happy...',
	'Nice job...',
	'FOR THE GLORY OF SATAN',
	'PRAISE THE SUN!'
];

const loser = [
	'HOW DARE YOU FAIL THIS ONE???',
	'LOOOOOSER',
	'Nyanpasu ;-;',
	';-;',
	'God damn it Leeroy',
	'(╯°□°）╯︵ ┻━┻',
	'DOES HE LOOK LIKE A B**CH?',
	'THE F**KERS!',
	'Who would expect that?',
	'WTF?!',
	'WHAT ARE WE WITHOUT THE SUN???'
];

const pools = { thinking, selected, winner, loser };

function getRandom(pool) {
	pool = pools[pool];
	return pool[Math.floor(Math.random() * pool.length)];
}

function getAll(index) {
	const texts = {};

	for (const pool of Object.keys(pools)) {
		texts[pool] = pools[pool][index];
	}

	return texts;
}

function getRandomAll() {
	return getAll(Math.floor(Math.random() * thinking.length));
}

export default {
	thinking,
	selected,
	winner,
	loser,

	getRandom,
	getAll,
	getRandomAll
};