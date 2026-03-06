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
  /** @param properties {RectangleProperties} */
  constructor(properties) {
    const { id, name, x, y, width, height, color } = properties;

    super({ id, name, x, y, color });

    /**
     * @type {number}
     * @protected
     */
    this._width = width;

    /**
     * @type {number}
     * @protected
     */
    this._height = height;
  }

  draw(ctx) {
    // Рамка
    ctx.strokeStyle = this.selected ? '#FFD700' : this.color;
    ctx.lineWidth = this.selected ? 3 : 1;
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
