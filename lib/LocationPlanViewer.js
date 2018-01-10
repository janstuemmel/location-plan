import Diagram from 'diagram-js';

import { concat } from 'lodash';

class LocationPlanViewer extends Diagram {

  constructor(container) {

    const modules = [
      { plan: [ 'value', LocationPlanViewer ] },
      require('./core'),
      require('diagram-js/lib/features/modeling'),
      require('diagram-js/lib/features/move'),
    ];

    const options = {
      modules: modules,
      canvas: { container: container }
    };

    super(options);

    const elementFactory = this.get('elementFactory');
    const canvas = this.get('canvas');
    const root = elementFactory.createRoot();

    canvas.setRootElement(root);
  }

  on(event, priority, callback, target) {
    return this.get('eventBus').on(event, priority, callback, target);
  }


  off(event, callback) {
    return this.get('eventBus').off(event, callback);
  }
}

module.exports = LocationPlanViewer;
