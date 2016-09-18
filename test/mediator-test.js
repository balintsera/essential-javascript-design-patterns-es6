'use strict';

const expect = require('chai').expect;
const should = require('should');
require('babel-register')({
      presets: [
        'es2015-node5',
    ],
});

const Mediator = require('../patterns/mediator/mediator');

describe('Mediator pattern - pubsub', function() {
  it('pubSub is an object', function() {
    const mediator = new Mediator();
    expect(typeof mediator).equals('object');
  });
});
