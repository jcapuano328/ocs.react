'use strict'
var Store = require('../stores/current.js');
var Battles = require('./battles.js');
var Phases = require('./phases.js');
var log = require('./log.js');
var moment = require('moment');
var RNFS = require('react-native-fs');
var FILE = 'ocs.app.current';
var PATH = RNFS.DocumentDirectoryPath + '/' + FILE;

var _current = null;

let turnIndex = (d) => {
	var battle = Battles.get(_current.battle);
	var day = d.date();
	for (var i = 0; i<battle.turnTable.length; i++) {
		if (day == battle.turnTable[i]) {
			return i;
		}
	}
	return 0;
}

let getPlayers = () => {
	let battle = Battles.get(_current.battle);
	let player1 = battle.players.find((p) => {
		return p.player == 'player1';
	});
	let player2 = battle.players.find((p) => {
		return p.player == 'player2';
	});
	return {
		player1: player1,
		player2: player2
	};
}

module.exports = {
	load() {
		return Store.load()
		.then((current) => {
			_current = current;
			return _current;
		});
	},
	save() {
		return Store.save(_current);
	},
	remove() {
		return Store.remove()
		.then(() => {
			_current = null;
		});
	},
	reset(data) {
		return Store.reset(data)
		.then((current) => {
			_current = current;			
			return _current;
		});
	},
	battle() {
		return Battles.get(_current.battle);
	},
	turn() {
		let battle = Battles.get(_current.battle);
		if (!battle) {
			return '';
		}
		let d = moment(battle.startDate);
		let lastday = moment(d).endOf('month').date();
		let turn = turnIndex(d);
		for (let i = 1; i<_current.turn; i++) {
			turn++;
			if (turn >= battle.turnTable.length || battle.turnTable[turn] > lastday) {
				turn = 0;
				d.add(1, 'months');
				lastday = moment(d).endOf('month');
			}
		}
		let dt = moment({year: d.year(), month: d.month(), day: battle.turnTable[turn]});
		let str = dt.format("MMM DD, YYYY");
		log.debug('turn: ' + str);
		return str;
	},
	turnNum() {
		return _current.turn;
	},
	prevTurn(dosave) {
		log.debug('prev turn: ' + _current.turn);
		if (--_current.turn < 1) {
			_current.turn = 1;
		}
        let turn = this.turn();
		if (dosave) {
        	return Store.save(_current)
            .then(() => {
            	return turn;
			});
		}
        return new Promise((resolve, reject) => {
        	resolve(turn);
        });
	},
	nextTurn(dosave) {
		log.debug('next turn: ' + _current.turn);
		let battle = Battles.get(_current.battle);
		var maxturns = battle.turns;
		log.debug('max turns: ' + maxturns);
		if (++_current.turn >= maxturns) {
			_current.turn = maxturns;
		}
        let turn = this.turn();
		if (dosave) {
        	return Store.save(_current)
            .then(() => {
            	return turn;
			});
		}
        return new Promise((resolve, reject) => {
        	resolve(turn);
        });
	},
	phase() {
		let players = getPlayers();
		let phase = Phases.get(_current.phase);
		let player = _current.player == players.player1.name ? players.player1.name : players.player2.name;
		if (phase.indexOf('1:') > -1) {
			phase = phase.replace('1:', player == players.player1.name ? players.player1.name : players.player2.name);
		} else if (phase.indexOf('2:') > -1) {
			phase = phase.replace('2:', player == players.player1.name ? players.player2.name : players.player1.name);
		}

		log.debug('phase: ' + phase);
		return phase;
	},
	prevPhase() {
		if (--_current.phase < 0) {
			_current.phase = Phases.count - 1;
			let players = getPlayers();
			if (_current.player == players.player1.name) {
				this.prevTurn(false);
				_current.player = players.player2.name;
			} else {
				_current.player = players.player1.name;
			}
		}
    	return Store.save(_current)
        .then(() => {
        	return this.phase();
		});
	},
	nextPhase() {
		if (++_current.phase >= Phases.count) {
			_current.phase = 0;
			let players = getPlayers();
			if (_current.player == players.player2.name) {
				this.nextTurn(false);
				_current.player = players.player1.name;
			} else {
				_current.player = players.player2.name;
			}
		}
    	return Store.save(_current)
        .then(() => {
        	return this.phase();
		});
	},
	nextPlayer() {
		let players = getPlayers();
		if (_current.player == players.player1.name) {
			_current.player = players.player2.name;
		} else {
			_current.player = players.player1.name;
		}
		return Store.save(_current)
        .then(() => {
        	return this.player();
		});
	},
	player() {
		return _current.player;
	},
	weather(wx) {
		if (typeof wx != 'undefined') {
			_current.weather = wx;
		}
		return _current.weather;
	}
};
