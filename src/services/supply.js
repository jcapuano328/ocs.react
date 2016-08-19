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

let adjust = (factor,unit,sp,token) => {
	let capturedunit = Math.round(unit * factor);
	let totalsp = (sp * 4) + token;
	let totalcapturedsp = Math.round(totalsp * factor);
	let totalremainingsp = totalsp - totalcapturedsp;

	return {
		result: (factor * 100) + '%',
		capturedunit: capturedunit,
		capturedsp: Math.floor(totalcapturedsp / 4),
		capturedtoken: totalcapturedsp % 4,
		remainingunit: unit - capturedunit,
		remainingsp: Math.floor(totalremainingsp / 4),
		remainingtoken: totalremainingsp % 4
	};
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
	},
	capture(mode,unit,sp,token,die) {
		let factor = 0;
		switch(mode) {
			case 0:	// dump
				if (die <= 1) {
					factor = 0.0;
				}
				else if (die <= 3) {
					factor = 0.25;
				}
				else if (die <= 5) {
					factor = 0.5;
				}
				else if (die <= 6) {
					factor = 0.75;
				}
				unit = 0;
				break;
			case 1:	// trucks
				if (die <= 2) {
					factor = 0.0;
				}
				else if (die <= 3) {
					factor = 0.25;
				}
				else if (die <= 5) {
					factor = 0.5;
				}
				else if (die <= 6) {
					factor = 0.75;
				}
				break;
			case 2:	// wagons
				if (die <= 2) {
					factor = 0.0;
				}
				else if (die <= 3) {
					factor = 0.25;
				}
				else if (die <= 4) {
					factor = 0.5;
				}
				else if (die <= 5) {
					factor = 0.75;
				}
				else if (die <= 6) {
					factor = 1.0;
				}
				break;
		}

		return adjust(factor,unit,sp,token);
	},
	destroy(sp,token,die) {
		let factor = 1;
		if 		(die <= 1) {factor = 0.25;}
		else if (die <= 3) {factor = 0.5;}
		else if (die <= 5) {factor = 0.75;}

		return adjust(factor,0,sp,token);
	}
};
