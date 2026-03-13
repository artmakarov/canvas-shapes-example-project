/**
 * Конфигурация кнопки
 * @typedef {Object} ButtonConfig
 * @property {string} id - Идентификатор кнопки
 * @property {string} text - Текст кнопки
 * @property {string} className - CSS классы кнопки
 * @property {(e: PointerEvent) => void} action - Функция действия кнопки
 * @property {(appStateSnapshot: AppStateSnapshot) => boolean} [isDisabled] - Функция
 *   проверки недоступности кнопки
 */

/**
 * Абстрактный класс для управления кнопками
 * @abstract
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
   * @param {AppStateSnapshot} appStateSnapshot
   * @return {void}
   */
  updateUI(appStateSnapshot) {
    throw new Error('Метод updateUI должен быть реализован подклассом!');
  }
}
