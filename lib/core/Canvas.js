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

    // svg is globally available
    // TODO: remove draggable and panZoom, see karma.config.js
    this.draw = SVG(config.container);

    this._create = {
      'rect': this._createRect.bind(this),
      'polygon': this._createPolygon.bind(this),
    }

    this._emitter.emit('canvas.init');
  }

  addElement(type, props) {

    let element = {
      type: type
    }

    this._emitter.emit(`element.add`, element);

    element.gfx = this._create[type](props);

    this._registry.add(element);

    this._emitter.emit(`element.added`, element);

    return element;
  }

  addRect(props) {
    return this.addElement('rect', props);
  }

  _createRect(props) {

    const { x, y, width, height } = props;

    const attrs = assign({}, DEFAULT_ATTRS, props.attrs);

    if(!x || !y || !width || !height) {
      throw new Error('rect must have { x, y, width, height }');
    }

    const rect = new SVG.Rect().size(width, height).move(x, y).attr(attrs);

    this.draw.put(rect);

    return rect;
  }

  _createPolygon() {}

}

Canvas.$inject = [ 'config', 'emitter', 'registry' ];

module.exports = Canvas;
