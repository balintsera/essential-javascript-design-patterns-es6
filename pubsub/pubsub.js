'use strict';

class PubSub
{
  constructor() {
    this.subscribers = [];
    this.uniqId = -1;
  }
  
  
  /**
   * Adds a new subscriber to a topic
   *
   * @param topic (topic name)
   * @param callb (callback funciton)
   */
  subscribe(topic, callb) {
    this.addTopicIfNotExists(topic);
    const subscriber = {
      uniqId: toString(++this.uniqId),
      callback: callb,
    };
    this.subscribers[topic].push(subscriber);
  }
  
  
  /**
   * Get all subscribers by topic
   *
   * @param topic (description)
   * @returns (description)
   */
  getSubscribersForTopic(topic) {
    return this.subscribers[topic];
  }
  
  
  /**
   * Publish: run every subscribers callback function with args
   *
   * @param topic 
   * @param payload 
   * @returns 
   */
  publish(topic, payload) {
    if (!this.subscribers[topic]) {
      throw new Error('No subscriber exists for topic:' + topic);
    }
    
    this.subscribers[topic].map(subscriber => subscriber.callback(topic, payload));
  }
  /**
   * Add a new topic to the subscribers array
   *
   * @param topic (description)
   */
  addTopicIfNotExists(topic) {
    if (!this.subscribers[topic]) {
      this.subscribers[topic] = [];
    }
  }
}

module.exports = PubSub;
