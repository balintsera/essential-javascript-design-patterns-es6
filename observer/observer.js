'use strict';

class Observer {
  update() {
    throw new Error('This observer has no update method. Every observer should have one.');
  }
}

module.exports = Observer;