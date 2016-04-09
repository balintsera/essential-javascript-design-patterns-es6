'use strict';

class PubSub
{
  constructor() {
    this.subscribers = [];
  }
  
  
  /**
   * Adds a new subscriber to a topic
   *
   * @param topic (topic name)
   * @param callb (callback funciton)
   * @return uniqId
   */
  subscribe(topic, callback) {
    this.addTopicIfNotExists(topic);
    const uniqId = this.uniquId();
    const subscriber = {
      uniqId,
      callback,
    };
    this.subscribers[topic].push(subscriber);
    
    // return the unique id 
    return uniqId;
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
   * unsubscribe a specified subscriber by its uniqId
   *
   * @param uniqId (string)
   */
  unsubscribe(uniqId) {
    if (typeof uniqId !== 'string') {
       throw new Error('UniqId must be a string, you sent a(n) ' + (typeof uniqId) );
    }
    
    let subscriberFound = false;
    try {
      subscriberFound = this.findSubscriberByUniqueId(uniqId);
    } catch (error) {
      return null;
    }
    
    for (const topic in this.subscribers) {
      const subscribersForTopic = this.subscribers[topic];
      subscribersForTopic.forEach((subscriber, index) => {
        if (subscriber === subscriberFound) {
          this.subscribers[topic].splice(index, 1);
        }
      });
    }
  }
  
  /**
   * find subscriber
   */
  findSubscriberByUniqueId(uniqId) {
    if (typeof uniqId !== 'string') {
       throw new Error('UniqId must be a string, you sent a(n) ' + (typeof uniqId) );
    }
    
    for (let topic in this.subscribers) {
      const subscribersForTopic = this.subscribers[topic];
      for (let index in subscribersForTopic) {
        const subscriber = subscribersForTopic[index];
        if (subscriber.uniqId === uniqId) {
          return subscriber;
        }
      }
    } 
    throw new Error('No subscriber found by id: ' + uniqId);
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
  
  /**
   * Generate pseudo unique id
   * 
   * @returns string unique id
   */
  uniquId() {
    const uid = parseInt((new Date()).valueOf() +
    (Math.random() * 1000000).toFixed()).toString(36);
    return uid;
  }
}

module.exports = PubSub;
