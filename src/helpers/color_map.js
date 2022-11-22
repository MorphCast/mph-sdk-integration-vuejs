export default class ColorMapper {
  constructor() {
    const map = new Image();
    map.onload = () => this._init(map);
    map.src = "/color_map.jpg";
  }

  _init(map) {
    this._canvas = document.createElement("canvas");
    this._canvas.width = map.width;
    this._canvas.height = map.height;
    this._context = this._canvas.getContext("2d");
    this._context.drawImage(map, 0, 0, map.width, map.height);
    this._ready = true;
  }

  getPixelColor(x, y) {
    if (!this._ready) return "rgba(0,0,0,0)";
    if (x === 100) x--;
    if (y === 100) y--;
    let u = (x * this._canvas.width) / 100;
    let v = (y * this._canvas.height) / 100;
    v = this._canvas.height - v;
    const pixelData = this._context.getImageData(u, v, 1, 1).data;
    return (
      "rgba(" +
      pixelData[0] +
      "," +
      pixelData[1] +
      "," +
      pixelData[2] +
      "," +
      pixelData[3] / 255 +
      ")"
    );
  }
}
