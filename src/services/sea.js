'use strict'

let getALT = (terrain) => {
	let table = [];
	switch (terrain) {
		case 'Low Hills':
			table = [6, 4, 3];
			break;
		case 'Hills':
			table = [7, 4, 3];
			break;
		case 'Rough':
			table = [8, 4, 3];
			break;
		case 'Mountain/City':
			table = [9, 3, 2];
			break;
		case 'Port':
			table = [4, 2, 1];
			break;
		case 'Open/Village':
		default:
			table = [5, 3, 2];
			break;
	}
	return table;
}

module.exports = {
	terrains: ['Open/Village', 'Low Hills', 'Hills', 'Rough', 'Mountain/City', 'Port'],
	amphiblanding(terrain,coastalarty,ship,nondgadj,dgadj,zoc,elite,die1,die2) {
		let dice = die1 + die2;
		if (nondgadj) {dice -= 2;}
		if (dgadj) {dice--;}
		if (ship) {dice++;}
		if (zoc) {dice--;}
		if (elite) {dice++;}
		dice += (-1 * coastalarty);
		let alt = getALT(terrain);
		let results = '';
		if (dice >= alt[0]) {
			results = 'Success';
		} else if (dice >= alt[1]) {
			results = 'Mixed (1/2 LC destroyed)';
		} else if (dice <= alt[2]) {
			results = 'Failure (1/2 LC/units destroyed)';
		}
		return results;
	}
};
