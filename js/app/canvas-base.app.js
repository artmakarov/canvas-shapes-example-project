import { PluginManager } from '../managers/plugin.manager.js';

/**
 * Модель конфигурации для класса {@link CanvasBaseApp}
 * @typedef {Object} CanvasBaseAppConfig
 * @property {ConnectionFactory} connectionFactory
 * @property {ConnectionGenerator} connectionGenerator
 * @property {BaseShapeManager} shapeManager
 * @property {BaseButtonUIManager} buttonManager
 * @property {BaseAppUIManager} uiManager
 * @property {Renderer} renderer
 */

/**
 * Базовый класс приложения
 */
export class CanvasBaseApp {
  /** @param {CanvasBaseAppConfig} config */
  constructor(config) {
    /**
     * @type {ConnectionFactory}
     * @protected
     */
    this._connectionFactory = config.connectionFactory;

    /**
     * @type {ConnectionGenerator}
     * @protected
     */
    this._connectionGenerator = config.connectionGenerator;

    /**
     * @type {BaseShapeManager}
     * @protected
     */
    this._shapeManager = config.shapeManager;

    /**
     * @type {BaseButtonUIManager}
     * @protected
     */
    this._buttonManager = config.buttonManager;

    /**
     * @type {BaseAppUIManager}
     * @protected
     */
    this._uiManager = config.uiManager;

    /**
     * @type {Renderer}
     * @protected
     */
    this._renderer = config.renderer;

    /**
     * @type {PluginManager}
     * @protected
     */
    this._pluginManager = new PluginManager(this);
  }

  /** @return {HTMLCanvasElement} */
  get canvas() {
    return this._renderer.canvas;
  }

  /** @param {ConnectionFactory} connectionFactory */
  setConnectionFactory(connectionFactory) {
    this._connectionFactory = connectionFactory;
  }

  /** @param {ConnectionGenerator} connectionGenerator */
  setConnectionGenerator(connectionGenerator) {
    this._connectionGenerator = connectionGenerator;
  }

  /** @param {BaseShapeManager} shapeManager */
  setShapeManager(shapeManager) {
    this._shapeManager = shapeManager;
  }

  /** @param {BaseButtonUIManager} buttonManager */
  setButtonManager(buttonManager) {
    this._buttonManager = buttonManager;
  }

  /** @param {Renderer} renderer */
  setRenderer(renderer) {
    this._renderer = renderer;
  }

  /**
   * Возвращает снимок состояния приложения
   * @return {AppStateSnapshot}
   */
  getStateSnapshot() {
    return {
      shapes: this._shapeManager.getAllShapes(),
      selectedShapes: this._shapeManager.selectedShapes,
    };
  }

  /** @return {void} */
  render() {
    const shapes = this._shapeManager.getAllShapes();
    const connections = this._connectionGenerator.generateConnections(shapes, this._connectionFactory);

    this._renderer.render(shapes, connections);
  }

  /** @return {void} */
  updateUI() {
    const stateSnapshot = this.getStateSnapshot();

    this._uiManager.updateUI(stateSnapshot);
  }

  /**
   * Добавляет функцию обратного вызова при обновлении UI
   * @param {UpdateUICallback} callback
   * @return {RemoveUpdateUICallback}
   */
  onUpdateUI(callback) {
    return this._uiManager.onUpdateUI(callback);
  }

  /**
   * Добавляет геометрические фигуры через фабрики
   * @param {ShapeFactory[]} shapeFactories
   * @return {Shape[]}
   */
  addShapes(shapeFactories) {
    /** @type {Shape[]} */
    const shapes = [];

    for (const shapeFactory of shapeFactories) {
      const shape = shapeFactory.createShape({
        id: this._shapeManager.nextShapeId,
        canvasWidth: this._renderer.canvas.width,
        canvasHeight: this._renderer.canvas.height,
      });

      this._shapeManager.addShape(shape);
      shapes.push(shape);
    }

    this.render();
    this.updateUI();

    return shapes;
  }

  /**
   * Удаляет геометрические фигуры
   * @param {Shape[]} shapes
   * @return {boolean}
   */
  removeShapes(shapes) {
    if (!shapes.length) {
      return false;
    }

    for (const shape of shapes) {
      this._shapeManager.removeShape(shape);
    }

    this.render();
    this.updateUI();

    return true;
  }

  /**
   * Удаляет все геометрические фигуры
   * @return {void}
   */
  clearShapes() {
    this._shapeManager.clear();
    this.render();
    this.updateUI();
  }

  /**
   * Возвращает все геометрические фигуры
   * @return {Shape[]}
   */
  getAllShapes() {
    return this._shapeManager.getAllShapes();
  }

  /**
   * Возвращает геометрическую фигуру в координате
   * @param {Coordinate} coordinate
   * @return {Shape|null}
   */
  getShapeAtPoint(coordinate) {
    return this._shapeManager.getShapeAtPoint(coordinate);
  }

  /**
   * Возвращает выбранные фигуры
   * @return {Shape[]}
   */
  getSelectedShapes() {
    return this._shapeManager.selectedShapes;
  }

  /**
   * Устанавливает выбранные фигуры
   * @param {Shape[]} shapes
   * @return {void}
   */
  setSelectedShapes(shapes) {
    this._shapeManager.selectedShapes = shapes;

    this.render();
    this.updateUI();
  }

  /**
   * @param {ButtonConfig[]|((self: this) => ButtonConfig[])} buttonConfigs
   * @return {this}
   */
  setButtons(buttonConfigs) {
    const buttons = typeof buttonConfigs === 'function' ? buttonConfigs(this) : buttonConfigs;

    this._buttonManager.setButtons(buttons);
    this.updateUI();

    return this;
  }

  /** @return {void} */
  resize() {
    this._renderer.resize();
  }

  /**
   * @param {string} name
   * @return {Plugin|null}
   */
  getPlugin(name) {
    return this._pluginManager.getPlugin(name);
  }

  /** @return {Plugin[]} */
  getActivePlugins() {
    return this._pluginManager.getActivePlugins();
  }

  /**
   * @param {Plugin[]} plugins
   * @return {this}
   */
  registerPlugins(plugins) {
    plugins.forEach((plugin) => this._pluginManager.register(plugin));
    return this;
  }

  /**
   * @param {string[]} names
   * @return {this}
   */
  unregisterPlugins(names) {
    names.forEach((name) => this._pluginManager.unregister(name));
    return this;
  }

  /** @return {this} */
  destroyAllPlugins() {
    this._pluginManager.destroyAll();
    return this;
  }
}
