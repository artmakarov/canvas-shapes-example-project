import { BaseFigure } from './base-figure.abstraction.js';

/**
 * @typedef {{ x: number, y: number}} Coordinate
 */

/**
 * Положение точки на фигуре для входящего/исходящего соединения
 * @typedef {
 * |'left'|'left-bottom'|'left-top'|'top'|'top-left'|'top-right'
 * |'right'|'right-bottom'|'right-top'|'bottom'|'bottom-left'|'bottom-right'
 * } Edge
 */

/**
 * Модель параметров для класса {@link Shape}
 * @typedef {Object} ShapeProperties
 * @property {number} id
 * @property {string} name
 * @property {number} x
 * @property {number} y
 * @property {string} color
 */

/**
 * Абстрактный класс для всех геометрических фигур на холсте
 * @abstract
 */
export class Shape extends BaseFigure {
  /**
   * @param {ShapeProperties} properties
   */
  constructor(properties) {
    super()

    const { id, name, x, y, color } = properties;

    /** @type {number} */
    this.x = x;

    /** @type {number} */
    this.y = y;

    /**
     * @type {number}
     * @protected
     */
    this._id = id;

    /**
     * @type {string}
     * @protected
     */
    this._name = name;

    /**
     * @type {string}
     * @protected
     */
    this._color = color;

    /**
     * @type {boolean}
     * @protected
     */
    this._selected = false;
  }

  /** @return {number} */
  get id() {
    return this._id;
  }

  /** @return {string} */
  get name() {
    return this._name;
  }

  /** @return {string} */
  get color() {
    return this._color;
  }

  /** @return {boolean} */
  get selected() {
    return this._selected;
  }

  /** @return {void} */
  select() {
    this._selected = true;
  }

  /** @return {void} */
  unselect() {
    this._selected = false;
  }

  /**
   * @abstract
   * @param {RenderingContext} ctx
   * @return {void}
   */
  draw(ctx) {
    super.draw(ctx);
  }

  /**
   * @abstract
   * @param {Coordinate} coordinate
   * @return {boolean}
   */
  containsPoint(coordinate) {
    throw new Error('Метод containsPoint должен быть реализован подклассом!');
  }

  /**
   * @abstract
   * @param {Edge} edge
   * @return {Coordinate|null}
   */
  getEdgePoint(edge) {
    throw new Error('Метод getEdgePoint должен быть реализован подклассом!');
  }
}
