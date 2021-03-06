'use strict';



class ObserverSubject {
  
  constructor(observerInterface = false) {
    this.observerList = [];
    if (observerInterface === false) {
      observerInterface = require('./observer.js');
    }
    this.observerInterface = observerInterface;
  }
  
  /**
   * Add an element to the observer list
   * @param object observer
   */
  add(observer) {
    if (!(observer instanceof this.observerInterface)) {
      throw new Error('Only Observers permitted to add as observer to subject');
    }
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
    this.checkElementsNumber(index);
    return this.observerList[index];
  }
  
  
  /**
   * Get the index of an object
   * @param obj (observerList element)
   * @param startIndex
   */
  indexOf(obj, startIndex = 0) {
    this.checkElementsNumber(startIndex);
    let i = startIndex;
    
    while (i < this.observerList.length) {
      if (this.observerList[i] === obj) {
        return +i;
      }
      i++;
    }
  }
  
  
  /**
   * Removes an element at the specified index
   *
   * @param index (element's index)
   */
  removeAt(index) {
    this.checkElementsNumber(index);
    this.observerList.splice(index, 1);
  }
  
  notify(context) {
    if (this.observerList.length < 1) {
      throw new Error('No observers');
    }
    for (let i in this.observerList) {
      const observer = this.observerList[i];
      observer.update(context);
    }
  }
  
  
  /**
   * Check wheter a number can be an index
   *
   * @param integer index 
   * @throws {Error}
   */
  checkElementsNumber(index) {
    if (index < 0 || index > this.observerList.length - 1) {
      throw new Error('Too low or too high index');
    }
  }
}

module.exports = ObserverSubject;