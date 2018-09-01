import Terrain from './terrain';

var types = ['Ground', 'Facility', 'Ship-to-Shore', 'Ship-to-Ship'];
var sizes = ['1 or less', '1+ to 3', '3+ to 4', '4+ to 5', '5+ to 6', '6+ or more'];
var resultsTable = {
	'Ground': [
		{strength:'1 or less - 1T',    results:['NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'DG', 'DG']},
		{strength:'2 to 2 - 1T',       results:['NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'DG', 'DG', '1/2']},
		{strength:'3 to 4 - 2T',       results:['NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'DG', 'DG', 'DG', '1/2']},
		{strength:'5 to 7 - 2T',       results:['NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'DG', 'DG', 'DG', '1/2', '1/2']},
		{strength:'8 to 11 - 2T',      results:['NE', 'NE', 'NE', 'NE', 'NE', 'DG', 'DG', 'DG', '[1/2]', '1/2', '1/2']},
		{strength:'12 to 16 - 3T',     results:['NE', 'NE', 'NE', 'NE', 'DG', 'DG', 'DG', '[1/2]', '[1/2]', '1/2', '1']},
		{strength:'17 to 24 - 3T',     results:['NE', 'NE', 'NE', 'DG', 'DG', 'DG', 'DG', '[1/2]', '1/2', '1/2', '1']},
		{strength:'25 to 40 - 4T',     results:['NE', 'NE', 'DG', 'DG', 'DG', 'DG', '[1/2]', '[1/2]', '1/2', '1/2', '1']},
		{strength:'41 to 68 - 5T',     results:['NE', 'DG', 'DG', 'DG', 'DG', '[1/2]', '[1/2]', '1/2', '1/2', '1', '1']},
		{strength:'69 to 116 - 8T',    results:['DG', 'DG', 'DG', 'DG', '[1/2]', '[1/2]', '1/2', '1/2', '1', '1', '2']},
		{strength:'117 or more - 10T', results:['DG', 'DG', 'DG', '[1/2]', '[1/2]', '1/2', '1/2', '1/2', '1', '2', '3']}
	],
	'Facility': [
		{strength:'1 - 1T',          results:['NE',  'NE',  'NE',  'NE',  'NE',  '(6)*']},
		{strength:'2 - 1T',          results:['NE',  'NE',  'NE',  'NE', '(6)',  '(5)*']},
		{strength:'3 to 4 - 1T',     results:['NE',  'NE',  'NE',  'NE', '(6)*', '1*(5)']},
		{strength:'5 to 10 - 1T',    results:['NE',  'NE',  'NE',  '(6)*', '1*(5)',  '1*(4)']},
		{strength:'11 to 20 - 2T',   results:['NE',  'NE',  '(5)', '1*(5)', '1*(4)',  '1*(4)']},
		{strength:'21 to 40 - 4T',   results:['NE',  '(5)',  '1(5)',  '1*(4)', '2*(4)',  '2*(4)']},
		{strength:'41 to 80 - 6T',   results:['(5)',  '1(4)',  '1(4)', '1*(4)', '2*(4)',  '2*(3)']},
		{strength:'81 or more - 8T', results:['1(5)',  '1(4)',  '1(4)',  '2*(4)', '2*(3)',  '2*(3)']}
	],
	'Ship-to-Shore': [
		{strength:'1 or less - 1T',    results:['NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'DG', 'DG']},
        {strength:'2 to 2 - 1T',       results:['NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'DG', 'DG', 'DG']},
        {strength:'3 to 4 - 2T',       results:['NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'DG', 'DG', 'DG', 'DG']},
        {strength:'5 to 7 - 2T',       results:['NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'DG', 'DG', 'DG', 'DG', 'DG']},
        {strength:'8 to 11 - 2T',      results:['NE', 'NE', 'NE', 'NE', 'NE', 'DG', 'DG', 'DG', 'DG', 'DG', 'DG']},
        {strength:'12 to 16 - 3T',     results:['NE', 'NE', 'NE', 'NE', 'DG', 'DG', 'DG', 'DG', 'DG', 'DG', '1/2']},
        {strength:'17 to 24 - 3T',     results:['NE', 'NE', 'NE', 'DG', 'DG', 'DG', 'DG', 'DG', 'DG', 'DG', '1/2']},
        {strength:'25 to 40 - 4T',     results:['NE', 'NE', 'DG', 'DG', 'DG', 'DG', 'DG', 'DG', 'DG', 'DG', '1/2']},
        {strength:'41 to 68 - 5T',     results:['NE', 'DG', 'DG', 'DG', 'DG', 'DG', 'DG', 'DG', 'DG', '1/2', '1/2']},
        {strength:'69 to 116 - 8T',    results:['DG', 'DG', 'DG', 'DG', 'DG', 'DG', 'DG', 'DG', '1/2', '1/2', '2']},
        {strength:'117 or more - 10T', results:['DG', 'DG', 'DG', 'DG', 'DG', 'DG', 'DG', 'DG', '1/2', '1', '2']}
	],
	'Ship-to-Ship': [
		{strength:'1 or less - 1T',    results:['NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'DG', 'DG']},
		{strength:'2 to 2 - 1T',       results:['NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'DG', 'DG', '1/2']},
		{strength:'3 to 4 - 2T',       results:['NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'DG', 'DG', 'DG', '1/2']},
		{strength:'5 to 7 - 2T',       results:['NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'DG', 'DG', 'DG', '1/2', '1/2']},
		{strength:'8 to 11 - 2T',      results:['NE', 'NE', 'NE', 'NE', 'NE', 'DG', 'DG', 'DG', '[1/2]', '1/2', '1/2']},
		{strength:'12 to 16 - 3T',     results:['NE', 'NE', 'NE', 'NE', 'DG', 'DG', 'DG', '[1/2]', '[1/2]', '1/2', '1']},
		{strength:'17 to 24 - 3T',     results:['NE', 'NE', 'NE', 'DG', 'DG', 'DG', 'DG', '[1/2]', '1/2', '1/2', '1']},
		{strength:'25 to 40 - 4T',     results:['NE', 'NE', 'DG', 'DG', 'DG', 'DG', '[1/2]', '[1/2]', '1/2', '1/2', '1']},
		{strength:'41 to 68 - 5T',     results:['NE', 'DG', 'DG', 'DG', 'DG', '[1/2]', '[1/2]', '1/2', '1/2', '1', '1']},
		{strength:'69 to 116 - 8T',    results:['DG', 'DG', 'DG', 'DG', '[1/2]', '[1/2]', '1/2', '1/2', '1', '1', '2']},
		{strength:'117 or more - 10T', results:['DG', 'DG', 'DG', '[1/2]', '[1/2]', '1/2', '1/2', '1/2', '1', '2', '3']}
	]
};

let resolveBarrage = (type, shift, strength, dice) => {	
	let table = resultsTable[type];
	let index = table.findIndex((r) => r.strength == strength) + shift;
	if (index < 0) {index = 0;}
	else if (index >= table.length) {index = table.length - 1;}
	let results = table[index].results;

	if (dice < 0) {dice = 0;}
	else if (dice > results.length) {dice = results.length - 1;}	
	return results[dice];
}

let groundShift = (size,terrain,spotter,hedgehog,stratmode,airclosetobase) => {
	// determine modifiers
	let shift = 0;
	if (hedgehog) {shift--;}
	if (!spotter) {shift -= 3;}
	if (stratmode) {shift += 3;}

	// terrain effects...
	terrain = Terrain.find(terrain);
	if (terrain.density == 'Extremely Close') {shift -= 2;}
	else if (terrain.density.indexOf('Close') > -1) {shift--;}
	// target density
	size = sizes.findIndex((s) => s == size);
	shift += (size - 1);
	// air unit proximity to base
	if (airclosetobase) {shift++;}

	return shift;
}

let resolveGround = (size,strength,terrain,spotter,hedgehog,stratmode,airclosetobase,die1,die2,die3) => {
	let dice = die1 + die2;
	if 		(dice < 2)  {dice = 2;}
	else if (dice > 12) {dice = 12;}

	// determine modifiers
	let shift = groundShift(size,terrain,spotter,hedgehog,stratmode,airclosetobase);
	let results = resolveBarrage('Ground', shift, strength, dice-2);
	if (results.indexOf('1/2') > -1) {
		results += (die3 > 3) ? ' (loss)' : ' (no loss)';
	}
	return results;
}

let resolveFacility = (strength,die) => {
	if 		(die < 1) {die = 1;}
	else if (die > 6) {die = 6;}

	return resolveBarrage('Facility', 0, strength, die-1);
}

let resolveShipToShore = (strength,die1,die2,die3) => {
	let dice = die1 + die2;
	if 		(dice < 2)  {dice = 2;}
	else if (dice > 12) {dice = 12;}

	let results = resolveBarrage('Ship-to-Shore', 0, strength, dice-2);
	if (results.indexOf('1/2') > -1) {
		results += (die3 > 3) ? ' (loss)' : ' (no loss)';
	}
	return results;
}

let resolveShipToShip = (strength,die1,die2,die3) => {
	let dice = die1 + die2;
	if 		(dice < 2)  {dice = 2;}
	else if (dice > 12) {dice = 12;}

	let results = resolveBarrage('Ship-to-Ship', 0, strength, dice-2);
	if (results.indexOf('1/2') > -1) {
		results += (die3 > 3) ? ' (loss)' : ' (no loss)';
	}
	return results;
}

module.exports = {
	defaultType: types[0],
	types: types,

	defaultSize: sizes[0],
	sizes: sizes,

	defaultStrength: resultsTable[types[0]][0].strength,
	strengths(type) {
		return resultsTable[type].map((s) => s.strength);
	},
	resolve(type,size,strength,terrain,spotter,hedgehog,stratmode,airclosetobase,die1,die2,die3) {
		switch(type) {
			case 'Ground':
				return resolveGround(size,strength,terrain,spotter,hedgehog,stratmode,airclosetobase,die1,die2,die3);
			case 'Facility':
				return resolveFacility(strength,die3);
			case 'Ship-to-Shore':
				return resolveShipToShore(strength,die1,die2,die3);
			case 'Ship-to-Ship':
				return resolveShipToShip(strength,die1,die2,die3);
			default:
				return 'NE';
		}
	},
	resolvePossible(type,size,strength,terrain,spotter,hedgehog,stratmode,airclosetobase,die1,die2,die3) {
		let shift = 0;
		let dice = 0;
		switch(type) {
			case 'Ground':
				dice = die1 + die2 - 2;
				shift = groundShift(size,terrain,spotter,hedgehog,stratmode,airclosetobase);
				break;
			case 'Ship-to-Shore':
			case 'Ship-to-Ship':			
				dice = die1 + die2 - 2;
				break;
			case 'Facility':
				dice = die1 - 1;
			default:
				break;
		}
		let table = resultsTable[type];
		return table.map((t) => {
			let index = ((dice > t.results.length) ? t.results.length - 1 : dice) + shift;
			return {strength: t.strength, results: t.results[index]};
		});
	}
};
