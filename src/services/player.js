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
		let player = find(code) || {name: 'tie'};
		return {player: player.player, name: player.name};
	},
	getByName(name) {
		let player = Current.battle().players.find((p) => {
			return p.name == name;
		}) || {name: 'tie'};
		return {player: player.player, name: player.name};
	}
};
