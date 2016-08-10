'use strict'
var Current = require('./current');

let player = (code) => {
	let player = Current.battle().players.find((p) => {
		return p.player == code;
	}) || {name: 'tie'};
	return {player: player.player, name: player.name};
}
let playerByName = (name) => {
	let player = Current.battle().players.find((p) => {
		return p.name == name;
	}) || {name: 'tie'};
	return {player: player.player, name: player.name};
}

module.exports = {
	current(init) {
		return Current.initiative(init);
	},
    find(d1, d2) {
		let diff = d1 - d2;
		let init = '';
		if (diff < 0) {
			init = 'player2';
		} else if (diff > 0) {
			init = 'player1';
		} else {
			init = '';
		}
		init = player(init);
		Current.initiative(init.name);
		return Current.save()
		.then(() => {
			return init.name;
		});
    },
	next() {
		let init = playerByName(this.current());
		if (init.player == 'player1') {
			init.player = 'player2';
		} else {
			init.player = 'player1';
		}
		init = player(init.player);
		Current.initiative(init.name);
		return Current.save()
		.then(() => {
			return init.name;
		});
	}
};
