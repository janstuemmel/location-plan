import TestContainer from 'mocha-test-container-support';

import LocationPlanViewer from '../../';

describe('LocationPlanViewer', () => {

  var testContainer;

  beforeEach( function () {
    testContainer = TestContainer.get(this);
  });


  it('should create element', () => {

    // given
    const plan = new LocationPlanViewer(testContainer);

    // when
    const eventEmitter = plan.get('emitter');

    // then
    expect(eventEmitter).to.be.not.undefined;
    expect(eventEmitter.on).to.be.not.undefined;
    expect(eventEmitter.emit).to.be.not.undefined;
  });


  it('should listen on events', done => {

    // given
    const plan = new LocationPlanViewer(testContainer);
    const emitter = plan.get('emitter');

    // then
    emitter.on('test.event', done);

    // when
    emitter.emit('test.event');
  });


  it('should draw rect', () => {

    // given
    const plan = new LocationPlanViewer(testContainer);
    const canvas = plan.get('canvas');

    // when
    const rect = canvas.addRect({
      x: 10,
      y: 10,
      width: 100,
      height: 100
    });

    // then
    expect(rect).to.be.not.undefined;
  });

});
