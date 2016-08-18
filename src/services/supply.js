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
    },
	attrition(ar,steps,die1,die2) {
		let dice = die1 + die2;
		let results = 'No Loss';

		if (steps > 0) {dice += 3;}
		if (ar <= 1) {	// 0
			if 		(dice <= 3)	{results = '-1 Step';}
			else if (dice <= 5)	{results = '-2 Step';}
			else if (dice <= 7)	{results = '-4 Step';}
			else 				{results = 'All Steps';}
		}
		else if (ar <= 2) {	// 1
			if 		(dice <= 2)	{results = 'No Loss';}
			else if (dice <= 4)	{results = '-1 Step';}
			else if (dice <= 6)	{results = '-2 Step';}
			else if (dice <= 8)	{results = '-4 Step';}
			else 				{results = 'All Steps';}
		}
		else if (ar <= 3) {	// 2
			if 		(dice <= 3)	{results = 'No Loss';}
			if 		(dice <= 5)	{results = '-1 Step';}
			else if (dice <= 7)	{results = '-2 Step';}
			else if (dice <= 9)	{results = '-4 Step';}
			else 				{results = 'All Steps';}
		}
		else if (ar <= 4) {	// 3
			if 		(dice <= 5)	{results = 'No Loss';}
			else if (dice <= 7)	{results = '-1 Step';}
			else if (dice <= 9)	{results = '-2 Step';}
			else if (dice <= 11){results = '-4 Step';}
			else 				{results = 'All Steps';}
		}
		else { // 4+
			if 		(dice <= 8)	{results = 'No Loss';}
			else if (dice <= 10){results = '-1 Step';}
			else if (dice <= 11){results = '-2 Step';}
			else if (dice <= 12){results = '-4 Step';}
			else 				{results = 'All Steps';}
		}
		return results;
	}
};
