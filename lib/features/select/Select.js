
class Select {

  constructor(emitter, registry) {
    this._emitter = emitter;
    this._registry = registry;

    this._emitter.on('element.added', ctx => {

      const element = ctx.element,
            gfx = ctx.gfx;

      let selected = element.selected = false;

      gfx.click(e => {

        if (!selected) {
          gfx.stroke('red');
          selected = true;
        } else {
          gfx.stroke('black');
          selected = false;
        }
      });
    });
  }
}

Select.$inject = [ 'emitter', 'registry' ];

module.exports = Select;
