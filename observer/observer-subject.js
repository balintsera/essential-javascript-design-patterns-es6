'use strict';

class ObserverSubject {
  constructor() {
    this.observerList = [];
  }
  
  /**
   * Add an element to the observer list
   */
  add(observer) {
    this.observerList.push(observer);
    
    return this;
  }
  
  /**
   * Count the numnber of observer list elements
   */
  count() {
    return this.observerList.length;
  }
  
  get(index) {
    if (index < 0 || index > this.observerList.length - 1) {
      throw new Error('Too low or too high index');
    }
    return this.observerList[index];
  }
  
  indexOf(obj, startIndex) {
    
  }
  
  removeAt(index) {
    
  }
  
}

module.exports = ObserverSubject;