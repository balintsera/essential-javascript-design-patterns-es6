const GoodStandingState = require('./good-standing-state');
const OnHoldState = require('./on-hold-state');

class OverDrawnState {
  
  constructor(manager) {
    this.manager = manager;
  }

  deposit(amount) {
    this.manager.addToBalance(amount);
    if (this.manager.getBalance() < 0) {
      this.manager.moveToState(new GoodStandingState(this.manager));
    }
  }

  withdraw() {
    this.manager.moveToState(new OnHoldState(this.manager));
    throw new Error('Cannot withraw money from an already overdrawn bank account');
  }
}

module.exports = OverDrawnState;