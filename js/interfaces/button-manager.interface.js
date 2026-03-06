/**
 * Конфигурация кнопки
 * @typedef {Object} ButtonConfig
 * @property {string} id - Идентификатор кнопки
 * @property {string} text - Текст кнопки
 * @property {string} className - CSS классы кнопки
 * @property {(e: PointerEvent) => void} action - Функция действия кнопки
 * @property {(shapeCount: number, selectedShape: Shape|null) => boolean} [isDisabled] - Функция
 *   проверки недоступности кнопки
 */

/**
 * Интерфейс для управления кнопками
 * @interface
 */
export class ButtonManager {
  /**
   * @abstract
   * @param {ButtonConfig[]} buttonConfigs
   * @return {void}
   */
  setButtons(buttonConfigs) {
    throw new Error('Метод setButtons должен быть реализован подклассом!');
  }

  /**
   * @abstract
   * @param {number} shapeCount
   * @param {Shape|null} selectedShape
   * @return {void}
   */
  updateUI(shapeCount, selectedShape) {
    throw new Error('Метод updateUI должен быть реализован подклассом!');
  }
}
