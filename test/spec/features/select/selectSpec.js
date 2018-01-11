import TestContainer from 'mocha-test-container-support';

import LocationPlanViewer from '../../../../';

const RECT = {
  x: 10,
  y: 10,
  width: 100,
  height: 100
};

describe.only('Select', () => {

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

});
