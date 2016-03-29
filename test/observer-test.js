'use strict';

const expect = require('chai').expect;
const should = require('should');
require('babel-register')({
      presets: [
        'es2015-node5',
    ],
});
    
const ObserverSubject = require('../patterns/observer/observer-subject.js');
const Observer = require('../patterns/observer/observer.js');

describe('Observer pattern - subject', function() {
  const _self = this;
  
  before(function() {
    class TestObserver extends Observer {
      update(event) {
      }
    }
    
    _self.observer = new TestObserver();
  });
  
  it('observerSubject is an object', function() {
    const subject = new ObserverSubject();
    expect(typeof subject).equals('object');
  });
  
  it('adds a listener to the list', function() {
    const listener = _self.observer;
    const subject = new ObserverSubject();
    const result = subject.add(listener);
    expect(typeof result).equals('object');
  });
  
  it('counts the number of the listeners', function() {
    const listener = _self.observer;
    const subject = new ObserverSubject();
   
    // Count
    const listenerCount = subject.add(listener).count();
    expect(listenerCount).equals(1);
  });
  
  it('returns the object at the specified index', function(){ 
    const listener = _self.observer;
    const subject = new ObserverSubject();
    const result = subject.add(listener);
    expect(listener).equals(subject.get(0));
  });
  
  it('returns the index of a specified object', function() {
    const listener = _self.observer;
    const subject = new ObserverSubject();
     class TestObserver2 extends Observer {
      update(event) {
      }
    }
    const listener2 = new TestObserver2();
    subject
    .add(listener)
    .add(listener2);
    
    expect(subject.indexOf(listener)).equals(0);
    expect(subject.indexOf(listener2)).equals(1);
    expect(subject.indexOf(listener2, 1)).equals(1);
  });
  
  it('removes an element at the specified index', function() {
    const listener = _self.observer;
    const subject = new ObserverSubject();
    subject
    .add(listener);
    
    expect(subject.indexOf(listener)).equals(0);
    
    subject.removeAt(0);
    expect(subject.count()).equals(0);
  });
  
  it('notifies observers', function() {
    const listener = _self.observer;
    const subject = new ObserverSubject();
    const listener2 = _self.observer;
    subject
    .add(listener)
    .add(listener2);
    
    const event = { type: 'userCreated', payload: { name: 'Bálint' } };
    subject.notify(event);
  });
});
