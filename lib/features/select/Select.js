
class Select {

  constructor(emitter, registry, canvas) {

    this._emitter = emitter;
    this._registry = registry;
    this._canvas = canvas;

    this.selectedElement = null;

    this._emitter.on('element.added', element => {

      const gfx = element.gfx;

      gfx.click(e => {

        // stop bubbeling down event
        e.stopPropagation();

        // clear selection
        if(this.selectedElement) {
          this.deselect();
        }

        // select
        this.select(element);
      });
    });

    // deselect on canvas click
    this._canvas.draw.click(() => this.selectedElement ? this.deselect() : null);
  }

  select(element) {

    const gfx = element.gfx;

    // set selected
    this.selectedElement = element;

    // set stroke
    gfx.stroke('red');

    // fire element.selected
    this._emitter.emit('element.selected', element);
  }

  deselect() {

    const element = this.selectedElement,
          gfx = element.gfx;

    // reset stroke
    gfx.stroke('black');

    // fire element.deselected
    this._emitter.emit('element.deselected', this.selectedElement);

    // unset selected
    this.selectedElement = null;
  }

}

Select.$inject = [ 'emitter', 'registry', 'canvas' ];

module.exports = Select;
