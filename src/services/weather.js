var inRange = require('./inrange');

let getWx = (turn, dice, table, lastwx) => {
	let range = table.find((e) => {
		if (e.condition && e.condition != lastwx) {
			return false;
		}
		return inRange(turn, e.turnStart, e.turnEnd);
	}) || {effects:[]};

	return (range.effects.find((e) => {
		return inRange(dice, e.low, e.high);
	}) || {effect: 'Clear'}).effect;
}

module.exports = {
    find(turn, settings, die1, die2, die3, die4, lastwx) {				
		let type = settings.dice.op;
		let wx = '';
		switch (type) {
			case 'B':
				wx = getWx(turn, 10*die1 + die2, settings.effects, lastwx);
				break;
			case 'C':
				wx = getWx(turn, die1, settings.effects, lastwx);
				break;
			case 'D':
				wx = die1 + ' / ' + die2;
				break;
			case 'E':
				wx = (10*die1 + die2) + ' / ' + die3 + ' / ' + die4;
				break;
			default:	// A
				wx = getWx(turn, die1 + die2, settings.effects, lastwx);
				break;
		}
		return wx;
    }
};
