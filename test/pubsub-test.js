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
      console.log('user/mail event happened', topics, payload);
    });
    expect(pubSub.getSubscribersForTopic('user/mail').length).equals(1);
  });
  
  it('publishes a topics all subscriber', function() {
    const pubSub = new PubSub();
    pubSub.subscribe('user/mail', function(topics, payload) {
      //console.log('user/mail event happened', topics, payload);
    });
    expect(pubSub.getSubscribersForTopic('user/mail').length).equals(1);
    
    expect(pubSub.publish.bind(pubSub, 'nonexisting')).to.throw('No subscriber exists for topic:nonexisting');
    
    expect(pubSub.publish.bind(pubSub, 'user/mail')).to.not.throw('No subscriber exists for topic:user/mail');    
  });
});
