'use strict'
var Current = require('./current');
var inRange = require('./inrange');

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
    find(die1, die2, die3, die4) {
		let turn = Current.turnNum();
		let battle = Current.battle();
		let type = battle.weather.dice.op;
		let wx = '';
		switch (type) {
			case 'B':
				wx = getWx(turn, 10*die1 + die2, battle.weather.effects);
			case 'C':
				wx = getWx(turn, die1, battle.weather.effects);
			case 'D':
				wx = die1 + ' / ' + die2;
			case 'E':
				wx = (10*die1 + die2) + ' / ' + die3 + ' / ' + die4;
			default:	// A
				wx = getWx(turn, die1 + die2, battle.weather.effects);
		}
		Current.weather(wx);
		return Current.save()
		.then(() => {
			return wx;
		});
    }
};
