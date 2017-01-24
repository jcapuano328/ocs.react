import {Repository} from 'react-native-nub';
let store = Repository('ocs.app.current');

module.exports = {
	load() {
		return store.load()
		.then((current) => {			
			return current;
		});
	},
	save(current) {
		return store.save(current);
	},
	remove() {
		return store.remove();
	},
	reset(data) {
		let current = {
			battle: data.id,
			turn: 1,
			phase: 0,
			weather: '',
			initiative: data.players[0].player,
			player: data.players[0].player,
			player1: {supply: '', reinforcements: ''},
			player2: {supply: '', reinforcements: ''}
		};
		return store.save(current)
		.then(() => {			
			return current;
		});
	}
};
