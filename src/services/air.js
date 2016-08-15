'use strict'

module.exports = {
	combat(attack,defend,die1,die2,die3) {
		let dice = (die1 + die2) + attack - defend;
		let results = 'NE';
		if (dice <= 6) {
			results = 'A Abort';
		}
		else if (dice >= 8) {
			results = 'D Abort';
		}
		else {
			results = 'Both Abort';
		}
		if (die3 >= 5 && results) {
			results += ' : Loss';
		}

        return results;
	}
};
