import { CanvasFigure } from './canvas-figure.abstraction.js';

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
 * Абстрактный класс для всех типов соединений между фигурами
 * @abstract
 */
export class Connection extends CanvasFigure {
  /**
   * @param {ConnectionProperties} properties
   */
  constructor(properties) {
    super();

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
   * @param {RenderingContext} ctx
   * @return {void}
   */
  draw(ctx) {
    super.draw(ctx);
  }
}
