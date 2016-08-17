'use strict'

var bases = ['None', 'Air Strip', 'Level 1', 'Level 2', 'Level 3'];
var zones = ['No Patrol', 'Escort', 'No Escort'];

let flakValue = (code) => {
	let flak = 0;
	switch (code) {
		case 'Level 1':
			flak = 1;
			break;
		case 'Level 2':
			flak = 2;
			break;
		case 'Level 3':
			flak = 3;
			break;
		case 'Escort':
			flak = 1;
			break;
		case 'No Escort':
			flak = 2;
			break;
		case 'Air Strip':
		case 'None':
		case 'No Patrol':
		default:
			break;
	}
	return flak;
}

module.exports = {
	bases: bases,
	zones: zones,
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
	},
	flak(size,airbase,patrol,intrinsic,hq,trainbusting,die1,die2,die3) {
		let flak = flakValue(airbase) + flakValue(patrol) + intrinsic;
		if (size >= 3) { flak++; }
		if (hq) { flak++; }
		if (hq) { trainbusting++; }
		let dice = die1 + die2 + flak;
		let results = 'NE';

		if (dice >= 11) {
            results = 'Loss';			
            if (die3 == 1) {
                results += ' : #1';
            }
            else if (die3 == 2) {
                if (size < 4) {
                    results += ' : #2';
                }
                else {
                    results += ' : #1';
                }
            }
            else if (die3 == 3) {
                if (size < 3) {
                    results += ' : #1';
                }
                else if (size < 4) {
                    results += ' : #2';
                }
                else {
                    results += ' : #3';
                }
            }
            else if (die3 == 4) {
                if (size < 4) {
                    results += ' : #2';
                }
                else {
                    results += ' : #4';
                }
            }
            else if (die3 == 5) {
                if (size < 3) {
                    results += ' : #2';
                }
                else if (size < 4) {
                    results += ' : #3';
                }
                else {
                    results += ' : Weakest';
                }
            }
            else if (die3 == 6) {
                if (size < 3) {
                    results += ' : #2';
                }
                else if (size < 4) {
                    results += ' : #3';
                }
                else {
                    results += ' : Strongest';
                }
            }
        }

		return results;
	}
};
