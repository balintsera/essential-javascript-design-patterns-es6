'use strict';

class ObserverSubject {
  constructor() {
    this.observerList = [];
  }
  
  /**
   * Add an element to the observer list
   * @param object observer
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
  
  /**
   * Get observer at the specified index
   * @param int index
   * @returns object
   * @throws Error
   */
  get(index) {
    if (index < 0 || index > this.observerList.length - 1) {
      throw new Error('Too low or too high index');
    }
    return this.observerList[index];
  }
  
  
  /**
   * Get the index of an object
   * @param obj (observerList element)
   * @param startIndex
   */
  indexOf(obj, startIndex) {
    for (var i in observerList) {
      if (observerList[i] === obj) {
        return i;
      }
    }
  }
  
  removeAt(index) {
    
  }
  
}

module.exports = ObserverSubject;