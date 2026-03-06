/**
 * Интерфейс для управления UI
 * @interface
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
