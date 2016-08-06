'use strict'

var phases = [
	"Weather",
	"First Player",
	"1: Air Unit Refit",
	"1: Reinforcement",
	"1: Breakout",
	"1: Mode and Movement",
	"1: Mode and Movement - Barrage",
	"1: Supply",
	"2: Reaction - Movement",
	"2: Reaction - Barrage",
	"1: Combat - Barrage",
	"1: Combat - Ground",
	"1: Exploit - Movement",
	"1: Exploit - Barrage",
	"1: Exploit - Ground",
	"1: Clean up",
	"2: Air Unit Refit",
	"2: Reinforcement",
	"2: Breakout",
	"2: Mode and Movement",
	"2: Mode and Movement - Barrage",
	"2: Supply",
	"1: Reaction - Movement",
	"1: Reaction - Barrage",
	"2: Combat - Barrage",
	"2: Combat - Ground",
	"2: Exploit - Movement",
	"2: Exploit - Barrage",
	"2: Exploit - Ground",
	"2: Clean up"
];

module.exports = {
	count: phases.length,
	all: function() {
    	return phases;
    },
    get: function(idx) {
    	if (idx > -1 && idx < phases.length) {
        	return phases[idx];
        }
    }
};
