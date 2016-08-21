'use strict'
var Current = require('./current');

let find = (code) => {
	return Current.battle().players.find((p) => {
		return p.player == code;
	});
}

module.exports = {
	player1() {
		return find('player1');
	},
	player2() {
		return find('player2');
	},
	get(code) {
		let player = find(code) || {player: '', name: '', icon: 'tie'};
		return {player: player.player, name: player.name, icon: player.icon};
	}
};
