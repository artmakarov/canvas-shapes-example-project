/**
 * Менеджер плагинов для приложения
 */
export class PluginManager {
  /** @param {CanvasAppBase} app */
  constructor(app) {
    /**
     * @type {Map<string, Plugin>}
     * @protected
     */
    this._plugins = new Map();

    /**
     * @type {CanvasAppBase}
     * @protected
     */
    this._app = app;
  }

  /**
   * Проверка, зарегистрирован ли плагин
   * @param {string} name
   * @return {boolean}
   */
  hasPlugin(name) {
    return this._plugins.has(name);
  }

  /**
   * Получение плагина по имени
   * @param {string} name
   * @return {Plugin|null}
   */
  getPlugin(name) {
    return this._plugins.get(name) || null;
  }

  /**
   * Получение всех активных плагинов
   * @return {Plugin[]}
   */
  getActivePlugins() {
    return Array
      .from(this._plugins.values())
      .filter((plugin) => plugin.isActive());
  }

  /**
   * Регистрация плагина
   * @param {Plugin} plugin
   * @return {void}
   */
  register(plugin) {
    const name = plugin.getName();

    if (this.hasPlugin(name)) {
      console.warn(`Плагин с именем ${name} уже зарегистрирован`);
      return;
    }

    this._plugins.set(name, plugin);
    this._initPlugin(plugin);
  }

  /**
   * Деинициализация и удаление плагина
   * @param {string} name
   * @return {void}
   */
  unregister(name) {
    const plugin = this._plugins.get(name);

    if (!plugin) {
      console.warn(`Плагин с именем ${name} не найден`);
      return;
    }

    this._destroyPlugin(plugin);
    this._plugins.delete(name);
  }

  /**
   * Инициализация всех зарегистрированных плагинов
   * @return {void}
   */
  initAll() {
    for (const plugin of this._plugins.values()) {
      this._initPlugin(plugin);
    }
  }

  /**
   * Деинициализация и удаление всех плагинов
   * @return {void}
   */
  destroyAll() {
    for (const plugin of this._plugins.values()) {
      this._destroyPlugin(plugin);
    }
    this._plugins.clear();
  }

  /**
   * @param {Plugin} plugin
   * @return {void}
   * @private
   */
  _initPlugin(plugin) {
    try {
      plugin.init(this._app);
    } catch (error) {
      console.error(`Ошибка при инициализации плагина ${plugin.getName()}:`, error);
    }
  }

  /**
   * @param {Plugin} plugin
   * @return {void}
   * @private
   */
  _destroyPlugin(plugin) {
    try {
      plugin.destroy();
    } catch (error) {
      console.error(`Ошибка при деинициализации плагина ${plugin.getName()}:`, error);
    }
  }
}
