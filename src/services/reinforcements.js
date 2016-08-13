'use strict'
var Current = require('./current');
var Player = require('./player');
var inRange = require('./inrange');

let get = (player, dice) => {
	return player.reinforcements.find((r) => {
		return inRange(dice, r.low, r.high);
	}) || {effect: ''};
}

module.exports = {
	current(reinforcements) {
		return Current.reinforcements(reinforcements);
	},
	find(player, d1, d2) {
		let reinforcements = {};
		reinforcements[player] = get((player == 'player1' ? Player.player1() : Player.player2()), d1 + d2).effect;
		Current.reinforcements(reinforcements);
		return Current.save()
		.then(() => {
			return reinforcements[player];
		});
    }
};
