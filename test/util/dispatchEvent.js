import { assign } from 'lodash';

module.exports = (eventName, node, props) => {

  // create event instance
  const event = new Event(eventName);

  // assign additional event props
  assign(event, props);

  // dispatch on node
  return node.dispatchEvent(event);
};
