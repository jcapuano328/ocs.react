var phases = [
	"Weather Determination",
	"Initiative Determination",
	"{a} Air Unit Refit",
	"{a} Reinforcement",
	"{a} Breakout",
	"{a} Mode and Movement",
	"{a} M & M - Barrage",
	"{a} Supply",
	"{r} Reaction - Movement",
	"{r} Reaction - Barrage",
	"{a} Combat - Barrage",
	"{a} Combat - Ground",
	"{a} Exploit - Movement",
	"{a} Exploit - Barrage",
	"{a} Exploit - Ground",
	"{a} Clean up"
];

module.exports = {
	count: phases.length,
	all() {
    	return phases;
    },
    get(idx) {
    	if (idx > -1 && idx < phases.length) {
        	return phases[idx];
        }
    }
};
