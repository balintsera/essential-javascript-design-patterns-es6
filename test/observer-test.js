'use strict';

const expect = require('chai').expect;
const should = require('should');
require('babel-register')({
      presets: [
        'es2015-node5',
    ],
});
    
const ObserverSubject = require('../observer/observer-subject.js');

describe('observer pattern, Subject', function() {
  
  it('observerSubject is an object', function() {
    const subject = new ObserverSubject();
    expect(typeof subject).equals('object');
  });
  
  it('adds a listener to the list', function() {
    const listener = 'test listener';
    const subject = new ObserverSubject();
    const result = subject.add(listener);
    expect(typeof result).equals('object');
  });
  
  it('counts the number of the listeners', function() {
    const listener = 'test listener';
    const subject = new ObserverSubject();
   
    // Count
    const listenerCount = subject.add(listener).count();
    expect(listenerCount).equals(1);
  });
  
  it('returns the object at the specified index', function(){ 
    const listener = 'test listener';
    const subject = new ObserverSubject();
    const result = subject.add(listener);
    expect(listener).equals(subject.get(0));
  });
  
  
  
});
