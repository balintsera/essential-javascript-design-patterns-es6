'use strict';

const expect = require('chai').expect;
const should = require('should');
require('babel-register')({
      presets: [
        'es2015-node5',
    ],
});

const State = require('../patterns/state/state');
const GoodStandigState = require('../patterns/state/good-standing-state');
const OverDrawnState = require('../patterns/state/over-drawn-state');

describe('State pattern', function() {
  it('State is an object', function() {
    const state = new State();
    expect(typeof state).equals('object');
  });

  it('State starts with a GoodStandingState', function() {
    const state = new State();
    expect(typeof state.currentState).equals('object');
    expect(state.currentState.constructor.name).equals('GoodStandingState'); 
  });

  it('GoodStandigState has deposit method', function() {
    const state = new State();
    const goodStandigState = new GoodStandigState(state);
    expect(typeof goodStandigState.deposit).equals('function');
    goodStandigState.deposit(10);
    expect(state.balance).equals(10); 
  });

  it('GoodStandigState has withdraw method', function() {
    const state = new State();
    const goodStandigState = new GoodStandigState(state);
    expect(typeof goodStandigState.deposit).equals('function');
    goodStandigState.withdraw(10);
    expect(state.balance).equals(-10); 
  });

  it('OverDrawnState is an object', function() {
    const state = new State();
    const goodStandigState = new GoodStandigState(state);
    expect(typeof goodStandigState).equals('object');
  });

  it('Removing amount from good state changes state to over drawn', function() {
    const state = new State();
    state.withdraw(100);
    expect(state.currentState.constructor.name).equals('OverDrawnState');
  });

  it('State has deposit method', function() {
    const state = new State();
    expect(typeof state.deposit).equals('function');
    state.deposit(10);
    expect(state.balance).equals(10); 
  });

});
