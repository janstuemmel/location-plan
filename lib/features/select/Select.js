
class Select {

  constructor(emitter, registry, canvas) {
    this._emitter = emitter;
    this._registry = registry;
    this._canvas = canvas;

    this.selectedElement = null;

    this._emitter.on('element.added', ctx => {

      const element = ctx.element,
            gfx = ctx.gfx;

      gfx.click(e => {

        // stop bubbeling down event
        e.stopPropagation();


        if(this.selectedElement) {
          this.deselect();
        }

        // select
        this.select(ctx);
      });
    });

    // unselect on canvas click
    this._canvas.draw.click(() => this.selectedElement ? this.deselect() : null);
  }

  select(ctx) {

    // set selected
    this.selectedElement = ctx;

    // set stroke
    ctx.gfx.stroke('red');

    // fire element.selected
    this._emitter.emit('element.selected', ctx);
  }

  deselect() {

    // reset stroke
    this.selectedElement.gfx.stroke('black');

    // fire element.deselected
    this._emitter.emit('element.deselected', this.selectedElement);

    // unset selected
    this.selectedElement = null;
  }

}

Select.$inject = [ 'emitter', 'registry', 'canvas' ];

module.exports = Select;
