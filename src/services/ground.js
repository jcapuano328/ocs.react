import Terrain from './terrain';

let oddsTable = {
	open: ['1:5','1:4','1:3','1:2','1:1','2:1','3:1','4:1','5:1','7:1','9:1','11:1','13:1'],
	close: ['1:4','1:3','1:2','1:1','2:1','3:1','4:1','6:1','8:1','10:1','12:1','15:1','18:1'],
	veryclose: ['1:3','1:2','1:1','2:1','3:1','4:1','6:1','9:1','12:1','15:1','18:1','21:1','24:1'],
	extremelyclose: ['1:2','1:1','2:1','3:1','4:1','8:1','12:1','16:1','20:1','28:1','36:1','44:1','52:1']
};

let resultsTable = [
	//Odds1 = -2; -3; -4; -5
	['AL2/NE', 'AL2/NE', 'AL2/NE', 'AL2/NE', 'AL2/NE', 'AL2/NE', 'AL1o1/NE', 'AL1o1/NE', 'AL1o1/Do1', 'AL1o1/Do1', 'AL1o1/Do1', 'AL1o1/Do1', 'Ao1/Do1', 'Ao1/Do1', 'Ao1/DL1o1'],
	//Odds2 = 1; -2; -3; -4
	['AL2/NE', 'AL2/NE', 'AL2/NE', 'AL2/NE', 'AL2/NE', 'AL2/NE', 'AL1o1/NE', 'AL1o1/Do1', 'AL1o1/Do1', 'AL1o1/Do1', 'AL1/Do1', 'Ao1/Do1', 'Ao1/Do1', 'Ao1/DL1o1', 'Ao1/DL1o1'],
	//Odds3 = 2; 1; -2; -3
	['AL2/NE', 'AL2/NE', 'AL2/NE', 'AL2/NE', 'AL2/NE', 'AL1o1/NE', 'AL1o1/Do1', 'AL1o1/Do1', 'AL1o1/Do1', 'AL1/Do1', 'Ao1/Do1', 'Ao1/Do1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1e4/DL1o2'],
	//Odds4 = 3; 2; 1; -2
	['AL2/NE', 'AL2/NE', 'AL2/NE', 'AL2/NE', 'AL1o1/NE', 'AL1o1/Do1', 'AL1o1/Do1', 'AL1o1/Do1', 'AL1/Do1', 'Ao1/Do1', 'Ao1/Do1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1e4/DL1o2', 'Ae4/DL1o2'],
	//Odds5 = 4; 3; 2; 1
	['AL2/NE', 'AL2/NE', 'AL2/NE', 'AL1o1/NE', 'AL1o1/Do1', 'AL1o1/Do1', 'AL1o1/Do1', 'AL1/Do1', 'Ao1/Do1', 'Ao1/Do1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1e4/DL1o2', 'Ae4/DL1o2'],
	//Odds6 = 8; 4; 3; 2
	['AL2/NE', 'AL2/NE', 'AL1o1/NE', 'AL1o1/Do1', 'AL1o1/Do1', 'AL1/Do1', 'AL1/Do1', 'Ao1/Do1', 'Ao1/Do1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1e4/DL1o2', 'Ae4/DL1o2', 'Ae3/DL2o2DG'],
	//Odds7 = 12; 6; 4; 3
	['AL2/NE', 'AL1o1/NE', 'AL1o1/Do1', 'AL1o1/Do1', 'AL1/Do1', 'AL1/Do1', 'Ao1/Do1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1e4/DL1o2', 'Ae4/DL1o2', 'Ae3/DL2o2DG', 'Ae3/DL2o2DG'],
	//Odds8 = 16; 9; 6; 4
	['AL1o1/NE', 'AL1o1/Do1', 'AL1o1/Do1', 'AL1/Do1', 'AL1/Do1', 'Ao1/Do1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1e4/DL1o2', 'Ae4/DL1o2', 'Ae4/DL1o2', 'Ae3/DL2o2DG', 'Ae3/DL2o2DG', 'Ae2/DL2o3DG'],
	//Odds9 = 20; 12; 8; 5
	['AL1o1/Do1', 'AL1o1/Do1', 'AL1/Do1', 'AL1/Do1', 'Ao1/Do1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1e4/DL1o2', 'Ae4/DL1o2', 'Ae4/DL1o2', 'Ae3/DL2o2DG', 'Ae3/DL2o2DG', 'Ae3/DL2o2DG', 'Ae2/DL2o3DG'],
	//Odds10 = 28; 15; 10; 7
	['AL1o1/Do1', 'AL1/Do1', 'AL1/Do1', 'Ao1/Do1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1e4/DL1o2', 'Ae4/DL1o2', 'Ae4/DL1o2', 'Ae3/DL2o2DG', 'Ae3/DL2o2DG', 'Ae3/DL2o2DG', 'Ae2/DL2o3DG', 'Ae2/DL2o3DG'],
	//Odds11 = 36; 18; 12; 9
	['AL1/Do1', 'AL1/Do1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1e4/DL1o2', 'Ae4/DL1o2', 'Ae4/DL1o2', 'Ae3/DL2o2DG', 'Ae3/DL2o2DG', 'Ae3/DL2o2DG', 'Ae2/DL2o3DG', 'Ae2/DL2o3DG', 'Ae2/DL2o3DG'],
	//Odds12 = 44; 21; 15; 11
	['AL1/Do1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1e4/DL1o2', 'Ae4/DL1o2', 'Ae4/DL1o2', 'Ae4/DL1o2', 'Ae3/DL2o2DG', 'Ae3/DL2o2DG', 'Ae3/DL2o2DG', 'Ae2/DL2o3DG', 'Ae2/DL2o3DG', 'Ae2/DL2o3DG', 'Ae2/DL2o3DG'],
	//Odds13 = 52; 24; 18; 13
	['AL1/DL1o1', 'Ao1/DL1o1', 'Ao1/DL1o1', 'Ao1e4/DL1o2', 'Ae4/DL1o2', 'Ae4/DL1o2', 'Ae3/DL2o2DG', 'Ae3/DL2o2DG', 'Ae3/DL2o2DG', 'Ae2/DL2o3DG', 'Ae2/DL2o3DG', 'Ae2/DL2o3DG', 'Ae2/DL2o3DG', 'Ae2/DL2o3DG', 'Ae2/DL2o3DG']
];

let findOdds = (odds, density) => {
	let item = oddsTable[density];
	for (var i=item.length-1; i>=0; i--) {
		let e = item[i];
		let parts = e.split(':');
		let left = +parts[0];
		let right = +parts[1];
		let v = (right == 1) ? left : -right;
		if (v <= odds || odds > v) {
			return e;
		}
	}
	return item[0];
}

let calcOdds = (attack, defend, density) => {
	let odds = Math.round(attack >= defend ? attack/defend : defend/attack) * (attack>=defend?1:-1);
	return findOdds(odds, density);
}

let attackStrength = (attackArmor,attackMech,attackOther,attackCS,attackTS,defendArmor,terrain,between) => {

	if (defendArmor > 0 && terrain.attack.armor >= 2)
		attackArmor *= 1.5;
	else
		attackArmor *= terrain.attack.armor;
	attackArmor *= between.attack.armor;

	if (defendArmor > 0 && terrain.attack.mech >= 2)
		attackMech *= 1.5;
	else
		attackMech *= terrain.attack.mech;
	attackMech *= between.attack.mech;

	attackOther *= terrain.attack.other;
	attackOther *= between.attack.other;

	attackArmor = modifyForSupply(attackArmor, attackCS);
	attackArmor = modifyForSupply(attackArmor, attackTS);

	attackMech = modifyForSupply(attackMech, attackCS);
	attackMech = modifyForSupply(attackMech, attackTS);

	attackOther = modifyForSupply(attackOther, attackCS);
	attackOther = modifyForSupply(attackOther, attackTS);

	return attackArmor + attackMech + attackOther;
}

let defendStrength = (defendArmor,defendMech,defendOther,defendCS,defendTS,terrain,between) => {

	defendArmor *= terrain.defend.armor;
	defendArmor *= between.defend.armor;

	defendMech *= terrain.defend.mech;
	defendMech *= between.defend.mech;

	defendOther *= terrain.defend.other;
	defendOther *= between.defend.other;

	defendArmor = modifyForSupply(defendArmor, defendCS);
	defendArmor = modifyForSupply(defendArmor, defendTS);

	defendMech = modifyForSupply(defendMech, defendCS);
	defendMech = modifyForSupply(defendMech, defendTS);

	defendOther = modifyForSupply(defendOther, defendCS);
	defendOther = modifyForSupply(defendOther, defendTS);

	return defendArmor + defendMech + defendOther;
}

let modifyForSupply = (v, b) => {
	if (!b) {
		v /= 2;
	}
	return v;
}

let surprise = (dice, die, drm, mode) => {
	dice += drm;
	if (mode == 0)	{	// regular
		//  regular: <= 5 is defender; >= 10 is attacker
		if (dice <= 5) {
			return {
				side: 'Def Surprise',
				shift: -die
			};
		}
		else if (dice >= 10) {
			return {
				side: 'Att Surprise',
				shift: die
			};
		}
	} else {	// overrun
		//  overrun: <= 6 is defender; >= 9 is attacker
		if (dice <= 6) {
			return {
				side: 'Def Surprise',
				shift: -die
			};
		}
		else if (dice >= 9)	{
			return {
				side: 'Att Surprise',
				shift: die
			};
		}
	}

	return {
		side: 'No Surprise',
		shift: 0
	};
}

let findResults = (odds,density,dice,drm,shift) => {
	let index = oddsTable[density].findIndex((o) => o == odds);
	index += shift;
	if (index < 0) {
		index = 0;
	} else if (index >= oddsTable[density].length) {
		index = oddsTable[density].length - 1;
	}
	dice += drm;
	if (dice < 1) {
		dice = 1;
	} else if (dice > 15) {
		dice = 15;
	}
	return resultsTable[index][dice-1];
}

let oddsIndex = (odds) => {
	switch(odds)
	{
		case '1:5':
		return 0;
		case '1:4':
		return 1;
		case '1:3':
		return 2;
		case '1:2':
		return 3;
		case '1:1':
		return 4;
		case '2:1':
		return 5;
		case '3:1':
		return 6;
		case '4:1':
		return 7;
		case '5:1':
		return 8;
		case '6:1':
		return 9;
		case '7:1':
		return 10;
		case '8:1':
		return 11;	
		case '9:1':
		return 12;
		case '10:1':
		return 13;		
		case '11:1':
		return 14;
		case '12:1':				
		return 15;
		case '13:1':
		return 16;
		case '15:1':
		return 17;
		case '16:1':
		return 18;		
		case '18:1':
		return 19;
		case '20:1':
		return 20;		
		case '21:1':
		return 21;
		case '24:1':
		return 22;
		case '28:1':
		return 23;
		case '36:1':
		return 24;
		case '44:1':
		return 25;
		case '52:1':
		return 26;		
		default:
		return 0;
	}
}

module.exports = {
	odds(density) {
    	return oddsTable[density] || [];
    },
	calc(attackArmor,attackMech,attackOther,attackCS,attackTS,
			defendArmor,defendMech,defendOther,defendCS,defendTS,
			terrain,between) {
		terrain = Terrain.find(terrain);
		between = Terrain.find(between);
		let attack = attackStrength(attackArmor,attackMech,attackOther,attackCS,attackTS,defendArmor,terrain,between);
		let defend = defendStrength(defendArmor,defendMech,defendOther,defendCS,defendTS,terrain,between);
		return calcOdds(attack, defend, terrain.density);
	},
	resolve(odds,attackAR,defendAR,defendHH,terrain,combatMode,die1,die2,die3,die4,die5) {
		terrain = Terrain.find(terrain);
		let drm = attackAR - defendAR - defendHH;
		let sur = surprise(die4 + die5, die3, drm, combatMode);
		let results = findResults(odds,terrain.density,die1 + die2,drm,sur.shift);
		return {
			odds: odds,
			surprise: sur.side,
			results: results
		};
	},
	resolvePossible(attackAR,defendAR,defendHH,combatMode,die1,die2,die3,die4,die5) {		
		let drm = attackAR - defendAR - defendHH;
		let sur = surprise(die4 + die5, die3, drm, combatMode);
		let dice = die1 + die2 + drm;		
		if (dice < 1) {
			dice = 1;
		} else if (dice > 15) {
			dice = 15;
		}		

		let results = [];
		Object.keys(oddsTable).forEach((density, di) => {
			oddsTable[density].forEach((odds) => {				
				let index = oddsTable[density].findIndex((o) => o == odds);
				if (index < 0) {
					index = 0;
				}				
				results.push({terrain: density, odds: odds, results: resultsTable[index][dice-1]});
			})			
		});		
		/* transform this:
			{terrain: '', odds: '', results: ''}
		into this:
			{odds: '', open: '', close: '', veryclose: '', extremelyclose: ''}
		*/
		return results.map((v) => v.odds).filter((v,i,a) => i == a.indexOf(v)).sort((l,r) => {
			l = oddsIndex(l);
			r = oddsIndex(r);
			if (l < r) {return -1;}
			else if (l > r) {return 1;}
			return 0;
		}).map((o) => {
			let odds = o;
			return {
				odds: odds,
				open: (results.find((r) => r.odds == odds && r.terrain == 'open')||{results: ''}).results,
				close: (results.find((r) => r.odds == odds && r.terrain == 'close')||{results: ''}).results,
				veryclose: (results.find((r) => r.odds == odds && r.terrain == 'veryclose')||{results: ''}).results,
				extremelyclose: (results.find((r) => r.odds == odds && r.terrain == 'extremelyclose')||{results: ''}).results
			};
		});
	}
};
