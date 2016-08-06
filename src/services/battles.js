'use strict';

var battles = require('../stores/battles.json');

module.exports = {
  battles: battles,
  get: function(battleid) {
    return battles.find((b,i) => {
      return b.id == battleid;
    }) || {};
  }
};
