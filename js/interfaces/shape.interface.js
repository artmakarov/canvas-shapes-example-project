/**
 * @typedef {{ x: number, y: number}} Coordinate
 */

/**
 * Сторона фигуры для входящего/исходящего соединения
 * @typedef {'left'|'right'|'top'|'bottom'} Edge
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
 * Интерфейс для всех фигур на холсте
 * @interface
 */
export class Shape {
  /**
   * @param {ShapeProperties} properties
   */
  constructor(properties) {
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
   * @param {CanvasRenderingContext2D} ctx
   * @return {void}
   */
  draw(ctx) {
    throw new Error('Метод draw должен быть реализован подклассом!');
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
   * @return {Coordinate}
   */
  getEdgePoint(edge) {
    throw new Error('Метод getEdgePoint должен быть реализован подклассом!');
  }
}
