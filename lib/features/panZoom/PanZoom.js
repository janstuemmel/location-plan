class PanZoom {

  constructor(canvas) {
    this._canvas = canvas;
    this._draw = canvas.draw;

    // apply panZoom
    this._draw.panZoom({ zoomFactor: 0.2, zoomMin: 0.5, zoomMax: 5 });
  }
}

PanZoom.$inject = [ 'canvas' ];

module.exports = PanZoom;
