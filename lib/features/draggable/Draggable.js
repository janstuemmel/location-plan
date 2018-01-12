class Draggable {

  constructor(emitter, select) {

    this._emitter = emitter;

    this._emitter.on('element.added', element => {

      // disable draggging as default
      element.gfx.draggable(false);
    });

    this._emitter.on('element.selected', element => {

      // enable dragging
      element.gfx.draggable(true);
    });

    this._emitter.on('element.deselected', element => {

      // disable dragging
      element.gfx.draggable(false);
    });
  }
}

Draggable.$inject = [ 'emitter', 'select' ];

module.exports = Draggable;
