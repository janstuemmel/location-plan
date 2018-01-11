import uuid from 'uuid/v1';
import { concat } from 'lodash';

class Registry {

  constructor(emitter) {
    this._emitter = emitter;
    this._elements = [];
  }

  add(element, gfx) {
    element.id = uuid();
    this._elements = concat([], this._elements, { element: element, gfx: gfx });
  }
}

Registry.$inject = [ 'emitter' ];

module.exports = Registry;
