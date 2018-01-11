import TestContainer from 'mocha-test-container-support';

import { assign } from 'lodash';

import Viewer from '../../../../';

const wheel = node => require('../../../util/dispatchEvent')('wheel', node, {
  deltaY: -5
});

const RECT = {
  x: 10,
  y: 10,
  width: 100,
  height: 100
};

describe('PanZoom', () => {

  var testContainer, viewer, canvas, panZoom;

  beforeEach( function () {

    testContainer = TestContainer.get(this);

    viewer = new Viewer(testContainer, { modules: [
      require('../../../../lib/features/panZoom')
    ]});

    canvas = viewer.get('canvas');
    panZoom = viewer.get('panZoom');
  });

  it('should panzoom on mousewheel', () => {

    // given
    const element = canvas.addRect(RECT);
    const gfx = element.gfx;
    const viewbox = canvas.draw.viewbox();

    // when
    wheel(canvas.draw.node);

    // then
    expect(canvas.draw.viewbox()).to.not.deep.equal(viewbox);
  });

});
