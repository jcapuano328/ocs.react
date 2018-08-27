var inRange = require('./inrange');

let getWx = (turn, dice, table) => {
	let range = table.find((e) => {
		return inRange(turn, e.turnStart, e.turnEnd);
	}) || {effects:[]};

	return (range.effects.find((e) => {
		return inRange(dice, e.low, e.high);
	}) || {effect: 'Clear'}).effect;
}

module.exports = {
    find(turn, settings, die1, die2, die3, die4) {				
		let type = settings.dice.op;
		let wx = '';
		switch (type) {
			case 'B':
				wx = getWx(turn, 10*die1 + die2, settings.effects);
				break;
			case 'C':
				wx = getWx(turn, die1, settings.effects);
				break;
			case 'D':
				wx = die1 + ' / ' + die2;
				break;
			case 'E':
				wx = (10*die1 + die2) + ' / ' + die3 + ' / ' + die4;
				break;
			default:	// A
				wx = getWx(turn, die1 + die2, settings.effects);
				break;
		}
		return wx;
    }
};
