import TestContainer from 'mocha-test-container-support';

import { assign } from 'lodash';

import Viewer from '../../../../';

const RECT = {
  x: 10,
  y: 10,
  width: 100,
  height: 100
};

describe('Draggable', () => {

  var testContainer, viewer, canvas, draggable, select;

  beforeEach(function() {

    testContainer = TestContainer.get(this);

    viewer = new Viewer(testContainer, { modules: [
      require('../../../../lib/features/select'),
      require('../../../../lib/features/draggable')
    ]});

    canvas = viewer.get('canvas');
    draggable = viewer.get('draggable');
    select = viewer.get('select');
  });


  it('should be draggable', () => {

    // given
    const element = canvas.addRect(RECT);
    const gfx = element.gfx;

    // sleect element
    select.select(element);

    // when
    drag(gfx, { x: 50, y: 50 });

    // then
    expect(gfx.x()).to.equal(50);
    expect(gfx.y()).to.equal(50);
  });


  it('should not be draggable on unselected element', () => {

    // given
    const element = canvas.addRect(RECT);
    const gfx = element.gfx;

    // when
    drag(gfx, { x: 50, y: 50 });

    // then
    expect(gfx.x()).to.equal(10);
    expect(gfx.y()).to.equal(10);
  });

});


function drag(gfx, position) {

  const dragger = gfx._memory._draggable;

  // create new event
  const event = new Event('mousedown');

  // start dragging
  assign(event, { pageY: gfx.y(), pageX: gfx.x(), which: 1 });
  dragger.start(event);

  // end dragging
  assign(event, { pageY: position.y, pageX: position.x });
  dragger.end(event);
}
