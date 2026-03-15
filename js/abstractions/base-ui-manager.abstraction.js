/**
 * Снимок состояния приложения
 * @typedef {Object} AppStateSnapshot
 * @property {ReadonlyArray<Readonly<Shape>>} shapes
 * @property {ReadonlyArray<Readonly<Shape>>} selectedShapes
 */

/**
 * Абстрактный класс для управления UI
 * @abstract
 */
export class BaseUIManager {
  /**
   * @abstract
   * @param {AppStateSnapshot} appStateSnapshot
   * @return {void}
   */
  updateUI(appStateSnapshot) {
    throw new Error('Метод updateUI должен быть реализован подклассом!');
  }
}
