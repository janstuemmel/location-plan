import uuid from 'uuid/v1';
import { concat } from 'lodash';

class Registry {

  constructor(emitter) {
    this._emitter = emitter;
    this._elements = [];
  }

  add(element) {
    element.id = uuid();
    this._elements = concat([], this._elements, element);
  }
}

Registry.$inject = [ 'emitter' ];

module.exports = Registry;
