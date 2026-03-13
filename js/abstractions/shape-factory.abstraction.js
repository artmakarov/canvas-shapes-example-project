/**
 * @typedef {Object} СreateShapeInput
 * @property {number} id
 * @property {number} canvasWidth
 * @property {number} canvasHeight
 */

/**
 * Абстрактный класс для генератора фигур
 * @abstract
 */
export class ShapeFactory {
  /**
   * @abstract
   * @param {СreateShapeInput} input
   * @return {Shape}
   */
  createShape(input) {
    throw new Error('Метод createShape должен быть реализован подклассом!');
  }
}
