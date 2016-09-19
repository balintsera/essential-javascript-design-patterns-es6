const OverDrawnState = require('../state/over-drawn-state');

class GoodStandingState {
  
  constructor(manager) {
    if (typeof manager === 'undefined') {
      throw new Exception('Manager is not injected to GoodStandingState');
    }
    this.manager = manager;
  }

  deposit(amount) {
    this.manager.addToBalance(amount);
  }

  withdraw(amount) {
    this.manager.removeFromBalance(amount);
     if (this.manager.getBalance() < 0) {
      this.manager.moveToState(new OverDrawnState(this.manager));
    }
  }
}

module.exports = GoodStandingState;