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
    find(player, d1, d2) {
		let turn = Current.turnNum();
		let supply = {};
		supply[player] = get(turn, (player == 'player1' ? Player.player1() : Player.player2()), d1 + d2).effect;
		Current.supply(supply);
		return Current.save()
		.then(() => {
			return supply[player];
		});
    }
};
