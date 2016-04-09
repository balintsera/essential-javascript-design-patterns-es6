'use strict';

const expect = require('chai').expect;
const should = require('should');
require('babel-register')({
      presets: [
        'es2015-node5',
    ],
});

const PubSub = require('../patterns/pubsub/pubsub');

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
  
  it('finds a subscriber by an id', () => {
    const pubSub = new PubSub();
    const subscirberId = pubSub.subscribe('user/mail', function(topics, payload) {
      // console.log('user/mail event happened', topics, payload);
    });
    expect(pubSub.findSubscriberByUniqueId(subscirberId)).to.be.a('object');
    expect(pubSub.findSubscriberByUniqueId.bind(pubSub, 'nonexisting')).to.throw('No subscriber found by id: nonexisting');
    expect(pubSub.findSubscriberByUniqueId.bind(pubSub, {})).to.throw('UniqId must be a string, you sent a(n) object');
  });
  
  it('unsubscribes a topic', () => {
    const pubSub = new PubSub();
    // This will stay
    const subscirberIdNoSubscribe = pubSub.subscribe('user/mail', function(topics, payload) {
      // console.log('user/mail event happened', topics, payload);
    });
    expect(pubSub.getSubscribersForTopic('user/mail').length).equals(1);

    // This will be removed
    const subscirberId = pubSub.subscribe('user/mail', function(topics, payload) {
      // console.log('user/mail event happened', topics, payload);
    });
    expect(pubSub.getSubscribersForTopic('user/mail').length).equals(2);
    pubSub.unsubscribe(subscirberId);
    expect(pubSub.getSubscribersForTopic('user/mail').length).equals(1);
    
    // unsubscribe nonexisting
    pubSub.unsubscribe('nonexisting');
    expect(pubSub.getSubscribersForTopic('user/mail').length).equals(1);
    
    expect(pubSub.unsubscribe.bind(pubSub, null)).to.throw('UniqId must be a string, you sent a(n) object');
  });
});
