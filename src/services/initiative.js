
module.exports = {
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
		return init;
    }
};
