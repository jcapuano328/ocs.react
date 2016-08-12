'use strict'
var Current = require('./current');
var Player = require('./player');

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
		init = Player.get(init);
		Current.initiative(init.name);
		return Current.save()
		.then(() => {
			return init.name;
		});
    },
	next() {
		let init = Player.getbyName(this.current());
		if (init.player == 'player1') {
			init.player = 'player2';
		} else {
			init.player = 'player1';
		}
		init = Player.get(init.player);
		Current.initiative(init.name);
		return Current.save()
		.then(() => {
			return init.name;
		});
	}
};
