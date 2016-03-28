'use strict';

const expect = require('chai').expect;
const should = require('should');
require('babel-register')({
      presets: [
        'es2015-node5',
    ],
});

const PubSub = require('../pubsub/pubsub');

describe('Pubsub pattern - pubsub', function() {
  it('pubSub is an object', function() {
    const subject = new PubSub();
    expect(typeof subject).equals('object');
  });
});
