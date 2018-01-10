import TestContainer from 'mocha-test-container-support';

import LocationPlanViewer from '../../';

describe('LocationPlanViewer', () => {

  var testContainer, locationPlanViewer, elementFactory, canvas, elementRegistry;

  beforeEach( function () {
    testContainer = TestContainer.get(this);
    locationPlanViewer = new LocationPlanViewer(testContainer);
    elementFactory = locationPlanViewer.get('elementFactory');
    canvas = locationPlanViewer.get('canvas');
    elementRegistry = locationPlanViewer.get('elementRegistry');
  });


  it('should create element', () => {

    // given
    var shape = elementFactory.createShape({ width: 100, height: 100, x: 10, y: 10, id: 'testShape' });

    // when
    canvas.addShape(shape, canvas.getRootElement());

    // then
    expect(elementRegistry.get('testShape')).to.be.not.undefined;
  });

});
