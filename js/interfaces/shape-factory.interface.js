/**
 * @typedef {Object} СreateShapeInput
 * @property {number} id
 * @property {number} canvasWidth
 * @property {number} canvasHeight
 */

/**
 * Интерфейс для генератора фигур
 * @interface
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
