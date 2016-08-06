'use strict'

var RNFS = require('react-native-fs');
var FILE = 'ocs.app.current';
var PATH = RNFS.DocumentDirectoryPath + '/' + FILE;
var log = require('../services/log.js');

module.exports = {
	load() {
        // read the file
    	log.debug('Load current from ' + PATH);
    	return RNFS.readFile(PATH)
    	.then((data) => {
    		if (data) {
    			log.debug('Current retrieved');
    			let current = JSON.parse(data);
    			log.debug(current);
    			return current;
    		}
    		log.debug('No Current battle');
    		return null;
    	})
    	.catch((err) => {
    		log.debug(err.message);
    		return null;
    	});
	},
	save(current) {
        // write the file
    	log.debug('Save Current to ' + PATH);
    	log.debug(current);
    	return RNFS.writeFile(PATH, JSON.stringify(current))
    	.then((success) => {
    		log.debug('Current saved');
    	})
    	.catch((err) => {
    		log.error(err.message);
    	});
	},
	remove() {
        log.debug('Remove Current from ' + PATH)
    	return RNFS.unlink(PATH)
    	.then((result) => {
        	let success = result[0], path = result[1];
    		log.debug('FILE DELETED', success, path);
    	})
    	// `unlink` will throw an error, if the item to unlink does not exist
    	.catch((err) => {
    		log.error(err.message);
    	});
	},
	reset(data) {
        let current = {};
    	current.battle = data.id;
    	current.turn = 1;
    	current.phase = 0;
		current.weather = '';
		current.player = data.players[0].name;
		current.player1 = {supply: '', reinforcements: ''};
		current.player2 = {supply: '', reinforcements: ''};
    	return this.save(current)
        .then(() => {
            return current;
        });
	}
};
