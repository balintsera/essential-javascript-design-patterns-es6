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
    const pubSub = new PubSub();
    expect(typeof pubSub).equals('object');
  });
  
  it('adds a new topic to subscribers array', function() {
    const pubSub = new PubSub();
    pubSub.addTopicIfNotExists('test/topic');
    expect(typeof pubSub.subscribers['test/topic']).not.equals('undefined');
  });  
    
  it('subscribes to a topic', function() {
    const pubSub = new PubSub();
    pubSub.subscribe('user/mail', function(topics, payload) {
      console.log('user/mail event happened');
    });
    expect(pubSub.getSubscribersForTopic('user/mail').length).equals(1);
  });
});
