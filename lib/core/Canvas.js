import SVG from 'svgjs';

import { assign } from 'lodash';

const DEFAULT_ATTRS = {
  fill: '#fff',
  stroke: '#000',
  'stroke-width': 1,
};

class Canvas {

  constructor(config, emitter, registry) {

    this._emitter = emitter;
    this._registry = registry;

    this.draw = SVG(config.container);

    this._create = {
      'rect': this._createRect.bind(this),
      'polygon': this._createPolygon.bind(this),
    }
  }

  addElement(type, element) {

    let gfx;

    this._emitter.emit(`element.add`, { type: type, element: element });

    gfx = this._create[type](element);

    this._registry.add(element, gfx);

    this._emitter.emit(`element.added`, { type: type, element: element, gfx: gfx });

    return element;
  }

  addRect(element) {
    return this.addElement('rect', element);
  }

  _createRect(element) {

    this._emitter.emit('render.rect', { element: element });

    const { x, y, width, height } = element;

    const attrs = assign({}, DEFAULT_ATTRS, element.attrs);

    if(!x || !y || !width || !height) {
      throw new Error('rect must have { x, y, width, height }');
    }

    const rect = this.draw.rect(width, height).move(x, y).attr(attrs);

    this._emitter.emit('rendered.rect', { element: element, gfx: rect });

    return rect;
  }

  _createPolygon() {}

}

Canvas.$inject = [ 'config', 'emitter', 'registry' ];

module.exports = Canvas;
