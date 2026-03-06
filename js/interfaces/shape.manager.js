/**
 * Интерфейс для управления фигурами
 * @interface
 */
export class ShapeManager {
  /**
   * @abstract
   * @param {Shape} shape
   * @return {void}
   */
  addShape(shape) {
    throw new Error('Метод addShape должен быть реализован подклассом!');
  }

  /**
   * @abstract
   * @param {Shape} shape
   * @return {void}
   */
  removeShape(shape) {
    throw new Error('Метод removeShape должен быть реализован подклассом!');
  }

  /**
   * @abstract
   * @return {void}
   */
  clear() {
    throw new Error('Метод clear должен быть реализован подклассом!');
  }

  /**
   * @abstract
   * @param {Coordinate} coordinate
   * @return {Shape|null}
   */
  getShapeAtPoint(coordinate) {
    throw new Error('Метод getShapeAtPoint должен быть реализован подклассом!');
  }

  /**
   * @abstract
   * @return {Shape[]}
   */
  getAllShapes() {
    throw new Error('Метод getAllShapes должен быть реализован подклассом!');
  }
}
