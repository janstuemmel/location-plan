import TestContainer from 'mocha-test-container-support';

import LocationPlanViewer from '../../../';

const RECT = {
  x: 10,
  y: 10,
  width: 100,
  height: 100
};

describe('Canvas', () => {

  var testContainer, plan, canvas;

  beforeEach( function () {
    testContainer = TestContainer.get(this);
    plan = new LocationPlanViewer(testContainer);
    canvas = plan.get('canvas');
  });


  it('should draw rect', () => {

    // when
    const rect = canvas.addRect(RECT);

    // then
    expect(rect).to.be.not.undefined;
  });


  it('should emit element.add event', done => {

    // then
    plan.get('emitter').on('element.add', element => {

      expect(element).to.be.not.undefined;
      done();
    });

    // when
    const rect = canvas.addRect(RECT);
  });


  it('should emit element.added event', done => {

    // then
    plan.get('emitter').on('element.added', element => {

      expect(element).to.be.not.undefined;
      expect(element.gfx).to.be.not.undefined;
      done();
    });

    // when
    const rect = canvas.addRect(RECT);
  });

});
