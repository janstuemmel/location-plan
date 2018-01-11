import TestContainer from 'mocha-test-container-support';

import { assign } from 'lodash';

import LocationPlanViewer from '../../../../';

const click = node => require('../../../util/dispatchEvent')('click', node);

const RECT = {
  x: 10,
  y: 10,
  width: 100,
  height: 100
};

describe('Select', () => {

  var testContainer, plan, canvas, registry, select;

  beforeEach( function () {

    testContainer = TestContainer.get(this);

    plan = new LocationPlanViewer(testContainer, { modules: [
      require('../../../../lib/features/select')
    ]});

    canvas = plan.get('canvas');
    select = plan.get('select');
  });

  it('should be selectable', (done) => {

    // given
    const element = canvas.addRect(RECT);
    const gfx = element.gfx;

    const onClick = () => {

      // then
      expect(select.selectedElement).to.be.not.null;
      done();
    };
    gfx.on('click', onClick);

    // when
    click(gfx.node);

    // after
    gfx.off('click', onClick);
  });


  it('should deselect on canvas click', done => {

    // given
    const element = canvas.addRect(RECT);
    const gfx = element.gfx;
    select.select(element);

    const onClick = () => {

      // then
      expect(select.selectedElement).to.be.null;
      done();
    };
    canvas.draw.on('click', onClick);

    // when
    click(canvas.draw.node);

    // after
    canvas.draw.off('click', onClick);
  });


  it('should deselect on other element click', done => {

    // given
    const element = canvas.addRect(RECT);
    const other_element = canvas.addRect(assign({}, RECT, { x: 120, y: 120 }));
    select.select(element);

    const onClick = () => {

      // then
      expect(select.selectedElement).to.equal(other_element);
      done();
    };
    other_element.gfx.on('click', onClick);

    // when
    click(other_element.gfx.node);

    // after
    other_element.gfx.off('click', onClick);
  });

});
