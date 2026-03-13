/**
 * Абстрактный класс для управления UI
 * @abstract
 */
export class UIManager {
  /**
   * @abstract
   * @param {number} shapeCount
   * @param {Shape|null} selectedShape
   * @return {void}
   */
  update(shapeCount, selectedShape) {
    throw new Error('Метод update должен быть реализован подклассом!');
  }
}
