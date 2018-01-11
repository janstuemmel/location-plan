import { concat, assign, forEach } from 'lodash';

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

class Viewer {

  constructor(container, options = {}) {

    const defaultModules = [
      { config: [ 'value', { container: container } ] },
      require('./core'),
    ];

    const additionalModules = options.modules ? options.modules : [];

    const modules = concat([], defaultModules, additionalModules);

    this.injector = createInjector(modules);
    this.invoke = this.injector.invoke;
    this.get = this.injector.get;

    this._emitter = this.get('emitter');

    this._emitter.emit('planer.init');
  }
}

module.exports = Viewer;
