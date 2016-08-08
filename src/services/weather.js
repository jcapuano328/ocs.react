'use strict'
var Current = require('./current');

let inRange = (d, lo, hi) => {
	return (d < lo || (d >= lo && d <= hi));
}

let getWx = (turn, dice, table) => {
	let range = table.find((e) => {
		return inRange(turn, e.turnStart, e.turnEnd);
	}) || {effects:[]};

	return (range.effects.find((e) => {
		return inRange(dice, e.low, e.hight);
	}) || {effect: 'Clear'}).effect;
}

module.exports = {
	current(wx) {
		return Current.weather(wx);
	},
	dice() {
		let battle = Current.battle();
		return battle.weather.dice;
	},
    find(turn, die1, die2, die3, die4) {
		let battle = Current.battle();
		let type = battle.weather.dice.op;
		switch (type) {
			case 'B':
				return getWx(turn, 10*die1 + die2, battle.weather.effects);
			case 'C':
				return getWx(turn, die1, battle.weather.effects);
			case 'D':
				return die1 + ' / ' + die2;
			case 'E':
				return (10*die1 + die2) + ' / ' + die3 + ' / ' + die4;
			default:	// A
				return getWx(turn, die1 + die2, battle.weather.effects);
		}
    }
};
