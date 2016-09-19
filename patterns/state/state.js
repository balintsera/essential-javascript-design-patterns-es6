const GoodStandingState = require('./good-standing-state');

class State {
  constructor () {
    // current state must implement some methods
    this.currentState = new GoodStandingState(this);

    // balance
    this.balance = 0;
  }

  // Call method with some parameter
  deposit(amount) {
    this.currentState.deposit(amount);
  }

  // another method
  withdraw(amount) {
    this.currentState.withdraw(amount);
  }

  addToBalance(amount) {
    this.balance += amount;
  }

  removeFromBalance(amount) {
    this.balance -= amount;
  }

  moveToState(newState) {
    this.currentState = newState;
  }

  getBalance() {
    return this.balance;
  }
}

module.exports = State;