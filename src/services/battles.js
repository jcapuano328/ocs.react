var battles = require('../data/battles.json');

module.exports = {    
  battles: battles,
  get(battleid) {
    return battles.find((b,i) => b.id == battleid) || {};
  }
};
