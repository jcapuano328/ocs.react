'use strict';

var battles = require('../stores/battles.json');

module.exports = {
  battles: battles,
  battle: function(battleid) {
    return battles.find((b,i) => {
      return b.id == battleid;
    }) || {};
  }
};
