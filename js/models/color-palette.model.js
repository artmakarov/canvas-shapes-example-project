export class ColorPalette {
  constructor() {
    /**
     * @type {string[]}
     * @protected
     */
    this._colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
      '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43'
    ];
  }

  /** @return {string} */
  getRandomColor() {
    return this._colors[Math.floor(Math.random() * this._colors.length)];
  }
}
