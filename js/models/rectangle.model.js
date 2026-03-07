import { Shape } from '../interfaces/shape.js';

/**
 * Модель параметров для класса {@link Rectangle}
 * @typedef {Object} RectangleProperties
 * @property {number} id
 * @property {string} name
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {string} color
 */

export class Rectangle extends Shape {
  static colorSelected = '#FFD700'
  static lineWidthBase = 1
  static lineWidthSelected = 3

  /** @param {RectangleProperties} properties */
  constructor(properties) {
    super(properties);

    /**
     * @type {number}
     * @protected
     */
    this._width = properties.width;

    /**
     * @type {number}
     * @protected
     */
    this._height = properties.height;
  }

  draw(ctx) {
    // Рамка
    ctx.strokeStyle = this.selected ? Rectangle.colorSelected : this.color;
    ctx.lineWidth = this.selected ? Rectangle.lineWidthSelected : Rectangle.lineWidthBase;
    ctx.strokeRect(this.x, this.y, this._width, this._height);

    // Текст
    ctx.fillStyle = this.color;
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      this._name,
      this.x + this._width / 2,
      this.y + this._height / 2,
    );
  }

  /**
   * @param {Coordinate} coordinate
   * @return {boolean}
   */
  containsPoint(coordinate) {
    const { x, y } = coordinate;

    return x >= this.x && x <= this.x + this._width &&
      y >= this.y && y <= this.y + this._height;
  }

  /**
   * @param {Edge} edge
   * @return {Coordinate}
   */
  getEdgePoint(edge) {
    /** @type {{left: number, right: number, top: number, bottom: number}} */
    const rect = {
      left: this.x,
      right: this.x + this._width,
      top: this.y,
      bottom: this.y + this._height,
    };

    switch (edge) {
      case 'left':
        return {
          x: rect.left,
          y: rect.top + this._height * 0.5,
        };

      case 'right':
        return {
          x: rect.right,
          y: rect.top + this._height * 0.5,
        };

      case 'top':
        return {
          x: rect.left + this._width * 0.5,
          y: rect.top,
        };

      case 'bottom':
      default:
        return {
          x: rect.left + this._width * 0.5,
          y: rect.bottom,
        };
    }
  }
}
