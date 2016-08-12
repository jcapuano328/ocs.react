'use strict'
var Current = require('./current');
var Player = require('./player');
var inRange = require('./inrange');

let get = (turn, player, dice) => {
	let range = player.supply.find((s) => {
		return inRange(turn, s.turnStart, s.turnEnd)
	}) || [];
	return range.effects.find((r) => {
		return inRange(dice, r.low, r.high);
	}) || {effect: ''};
}

module.exports = {
	current(supply) {
		return Current.supply(supply);
	},
    find(d1, d2, d3, d4) {
		let turn = Current.turnNum();
		let supply = {
			player1: get(turn, Player.player1(), d1 + d2).effect,
			player2: get(turn, Player.player2(), d3 + d4).effect
		};
		console.log(supply);
		Current.supply(supply);
		return Current.save()
		.then(() => {
			return supply;
		});
    }
};
