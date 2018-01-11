import { concat } from 'lodash';
import { assign, forEach } from 'lodash';

const di = require('didi');

function createInjector(modules) {

  const injector = new di.Injector(modules);

  forEach(modules, module => {
    forEach(module.__init__, c => {
      injector[typeof c === 'string' ? 'get' : 'invoke'](c);
    });
  });

  return injector;
}

class LocationPlanViewer {

  constructor(container, options) {

    const modules = [
      { config: [ 'value', { container: container } ] },
      require('./core'),
      require('./features/panZoom'),
      require('./features/select')
    ];

    options = {
      modules: modules,
      container: container
    };

    this.injector = createInjector(modules);
    this.invoke = this.injector.invoke;
    this.get = this.injector.get;

    this._emitter = this.get('emitter');
    this._draw = this.get('canvas');

    this._emitter.emit('planer.init');
  }
}

module.exports = LocationPlanViewer;
