/**
 * Абстрактный класс для всех плагинов
 * @abstract
 */
export class Plugin {
  constructor() {
    /**
     * @type {boolean}
     * @protected
     */
    this._isActive = false;

    /**
     * @type {CanvasAppBase|null}
     * @protected
     */
    this._app = null;
  }

  /** @return {CanvasAppBase} */
  get app() {
    if (!this._app) {
      throw new Error(`Плагин ${this.getName()} не инициализирован`);
    }
    return this._app;
  }

  /**
   * Получение имени плагина
   * @abstract
   * @return {string}
   */
  getName() {
    return super.getName()
  }

  /** @return {boolean} */
  isActive() {
    return this._isActive;
  }

  /**
   * @param {CanvasAppBase} app
   * @return {void}
   */
  init(app) {
    if (this._isActive) {
      console.warn(`Плагин ${this.getName()} уже инициализирован`);
      return;
    }

    this._app = app;
    this._isActive = true;

    try {
      this.onInit();
      console.info(`Плагин ${this.getName()} успешно инициализирован`);
    } catch (error) {
      this._isActive = false;
      this._app = null;
      throw error;
    }
  }

  /** @return {void} */
  destroy() {
    if (!this._isActive) {
      return;
    }

    try {
      this.onDestroy();
      console.info(`Плагин ${this.getName()} успешно деинициализирован`);
    } catch (error) {
      throw error;
    } finally {
      this._isActive = false;
      this._app = null;
    }
  }

  /**
   * Инициализация. Метод для переопределения в подклассах.
   * @abstract
   * @return {void}
   * @protected
   */
  onInit() {
    throw new Error('Метод onInit должен быть реализован подклассом!');
  }

  /**
   * Деинициализация. Метод для переопределения в подклассах.
   * @abstract
   * @return {void}
   * @protected
   */
  onDestroy() {
    throw new Error('Метод onDestroy должен быть реализован подклассом!');
  }
}
