/**
 * Снимок состояния приложения
 * @typedef {Object} AppStateSnapshot
 * @property {Shape[]} shapes
 * @property {Shape[]} selectedShapes
 */

/**
 * Абстрактный класс для управления UI
 * @abstract
 */
export class UIManager {
  /**
   * @abstract
   * @param {AppStateSnapshot} appStateSnapshot
   * @return {void}
   */
  update(appStateSnapshot) {
    throw new Error('Метод update должен быть реализован подклассом!');
  }
}
