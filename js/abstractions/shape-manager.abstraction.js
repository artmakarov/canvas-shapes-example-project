/**
 * Абстрактный класс для управления фигурами
 * @abstract
 */
export class ShapeManager {
  /**
   * @abstract
   * @type {number}
   */
  get nextShapeId() {
    throw new Error('Метод `get nextShapeId` должен быть реализован подклассом!');
  }

  /**
   * @abstract
   * @return {Shape|null}
   */
  get selectedShape() {
    throw new Error('Метод `get selectedShape` должен быть реализован подклассом!');
  }

  /**
   * @abstract
   * @param {Shape|null} shape
   */
  set selectedShape(shape) {
    throw new Error('Метод `set selectedShape` должен быть реализован подклассом!');
  }

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
