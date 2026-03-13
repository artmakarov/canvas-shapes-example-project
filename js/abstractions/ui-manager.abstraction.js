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
