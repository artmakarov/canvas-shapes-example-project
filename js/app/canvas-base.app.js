/**
 * Модель конфигурации для класса {@link CanvasAppBase}
 * @typedef {Object} CanvasAppBaseConfig
 * @property {ShapeFactory} shapeFactory
 * @property {ConnectionFactory} connectionFactory
 * @property {ConnectionGenerator} connectionGenerator
 * @property {ShapeManager} shapeManager
 * @property {ButtonManager} buttonManager
 * @property {UIManager} uiManager
 * @property {CanvasRenderer} renderer
 */

/**
 * Базовый класс приложения
 */
export class CanvasAppBase {
  /** @param {CanvasAppBaseConfig} config */
  constructor(config) {
    /**
     * @type {ShapeFactory}
     * @protected
     */
    this._shapeFactory = config.shapeFactory;

    /**
     * @type {ConnectionFactory}
     * @protected
     */
    this._connectionFactory = config.connectionFactory;

    /**
     *
     * @type {ConnectionGenerator}
     * @protected
     */
    this._connectionGenerator = config.connectionGenerator;

    /**
     * @type {ShapeManager}
     * @protected
     */
    this._shapeManager = config.shapeManager;

    /**
     * @type {ButtonManager}
     * @protected
     */
    this._buttonManager = config.buttonManager;

    /**
     * @type {UIManager}
     * @protected
     */
    this._uiManager = config.uiManager;

    /**
     * @type {CanvasRenderer}
     * @protected
     */
    this._renderer = config.renderer;
  }

  /** @return {void} */
  _updateUI() {
    const shapes = this._shapeManager.getAllShapes();
    const selectedShape = this._shapeManager.selectedShape;

    this._uiManager.update(shapes.length, selectedShape);
  }

  /** @return {void} */
  _render() {
    const shapes = this._shapeManager.getAllShapes();
    const connections = this._connectionGenerator.generateConnections(shapes, this._connectionFactory);

    this._renderer.render(shapes, connections);
  }
}
