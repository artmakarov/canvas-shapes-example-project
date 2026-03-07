/**
 * Модель параметров для класса {@link Connection}
 * @typedef {Object} ConnectionProperties
 * @property {number} startX
 * @property {number} startY
 * @property {number} endX
 * @property {number} endY
 * @property {Edge} fromEdge
 * @property {Edge} toEdge
 */

/**
 * Интерфейс для всех типов соединений между фигурами
 * @interface
 */
export class Connection {
  /**
   * @param {ConnectionProperties} properties
   */
  constructor(properties) {
    const { startX, startY, endX, endY, fromEdge, toEdge } = properties;

    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.fromEdge = fromEdge;
    this.toEdge = toEdge;
  }

  /**
   * @abstract
   * @param {CanvasRenderingContext2D} ctx
   * @return {void}
   */
  draw(ctx) {
    throw new Error('Метод draw должен быть реализован подклассом!');
  }
}
