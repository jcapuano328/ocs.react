var terrain = [
	{desc:'Open', density:'open', attack: {armor:2, mech:2, other:1}, defend: {armor:1, mech:1, other:1}},
	{desc:'Woods', density:'close', attack: {armor:1, mech:1, other:1}, defend: {armor:1, mech:1, other:1}},
	{desc:'Forest', density:'close', attack: {armor:.5, mech:1, other:1}, defend: {armor:.5, mech:1, other:1}},
	{desc:'Low Hills', density:'close', attack: {armor:1, mech:1, other:1}, defend: {armor:1, mech:1, other:1}},
	{desc:'Hills', density:'close', attack: {armor:1, mech:1, other:1}, defend: {armor:1, mech:1, other:1}},
	{desc:'Rough', density:'close', attack: {armor:.5, mech:.5, other:1}, defend: {armor:1, mech:1, other:1}},
	{desc:'Mountain', density:'veryclose', attack: {armor:.333, mech:.5, other:1}, defend: {armor:.333, mech:.5, other:1}},
	{desc:'Lava', density:'veryclose', attack: {armor:.5, mech:.5, other:1}, defend: {armor:.5, mech:.5, other:1}},
	{desc:'Village', density:'close', attack: {armor:1, mech:1, other:1}, defend: {armor:1, mech:1, other:1}},
	{desc:'Minor City', density:'veryclose', attack: {armor:.5, mech:.5, other:1}, defend: {armor:.5, mech:1, other:1}},
	{desc:'Major City', density:'extremelyclose', attack: {armor:.333, mech:.5, other:1}, defend: {armor:.333, mech:1, other:1}},
	{desc:'Minor River', density:'other', attack: {armor:.5, mech:.5, other:.5}, defend: {armor:1, mech:1, other:1}},
	{desc:'Major River', density:'other', attack: {armor:.25, mech:.333, other:.5}, defend: {armor:1, mech:1, other:1}},
	{desc:'Frozen Minor River', density:'other', attack: {armor:.5, mech:1, other:1}, defend: {armor:1, mech:1, other:1}},
	{desc:'Frozen Major River', density:'other', attack: {armor:.5, mech:.5, other:.5}, defend: {armor:1, mech:1, other:1}},
	{desc:'Salt Marsh', density:'close', attack: {armor:.5, mech:.5, other:1}, defend: {armor:.5, mech:1, other:1}},
	{desc:'Swamp', density:'veryclose', attack: {armor:.5, mech:.5, other:1}, defend: {armor:.5, mech:.5, other:1}},
	{desc:'Frozen Swamp', density:'close', attack: {armor:.5, mech:.5, other:1}, defend: {armor:.5, mech:1, other:1}},
	{desc:'Dry Lake', density:'other', attack: {armor:.333, mech:.5, other:1}, defend: {armor:.333, mech:.5, other:1}},
	{desc:'Wadi', density:'other', attack: {armor:.5, mech:.5, other:.5}, defend: {armor: 1, mech:1, other:1}},
	{desc:'Escarpment', density:'other', attack: {armor:.25, mech:.333, other:.5}, defend: {armor: 1, mech:1, other:1}},
	{desc:'Moscow Defense', density:'close', attack: {armor:1, mech:1, other:1}, defend: {armor: 2, mech:2, other:2}}
];

module.exports = {
	count: terrain.length,
	all() {
    	return terrain;
    },
	inside() {
    	return terrain.filter((t) => t.density != 'other');
    },
	between() {
    	return terrain.filter((t) => t.density == 'other');
    },
	find(name) {
		return terrain.find((t) => t.desc == name) || {desc: name, density: '', attack:{armor:1,mech:1,other:1},defend:{armor:1,mech:1,other:1}};
	},
    get(idx) {
    	if (idx > -1 && idx < terrain.length) {
        	return terrain[idx];
        }
    }
};
