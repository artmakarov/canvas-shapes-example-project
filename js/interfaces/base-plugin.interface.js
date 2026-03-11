/**
 * Интерфейс плагина приложения
 * @interface
 */
export class BasePlugin {
  /**
   * Получение имени плагина
   * @abstract
   * @return {string}
   */
  getName() {
    throw new Error('Метод getName должен быть реализован подклассом!');
  }

  /**
   * Проверка, активен ли плагин
   * @abstract
   * @return {boolean}
   */
  isActive() {
    throw new Error('Метод isActive должен быть реализован подклассом!');
  }

  /**
   * Инициализация плагина
   * @abstract
   * @param {CanvasAppBase} app - Экземпляр приложения
   * @return {void}
   */
  init(app) {
    throw new Error('Метод init должен быть реализован подклассом!');
  }

  /**
   * Деинициализация плагина
   * @abstract
   * @return {void}
   */
  destroy() {
    throw new Error('Метод destroy должен быть реализован подклассом!');
  }
}
