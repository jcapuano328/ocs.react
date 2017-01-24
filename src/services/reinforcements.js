var inRange = require('./inrange');

module.exports = {
	find(turn, player, d1, d2) {
		let dice = d1 + d2;
		let res = player.reinforcements.find((r) => inRange(dice, r.low, r.high)) || {effect: ''};		
		return res.effect;
    }
};
