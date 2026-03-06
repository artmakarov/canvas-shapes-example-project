/**
 * Интерфейс для генератора фигур
 * @interface
 */
export class ShapeFactory {
  /**
   * @abstract
   * @param {number} id
   * @return {Shape}
   */
  createShape(id) {
    throw new Error('Метод createShape должен быть реализован подклассом!');
  }
}
