import { CanvasAppBase } from './canvas-base.app.js';

/**
 * Модель конфигурации для класса {@link CanvasApp}
 * @typedef {Object} CanvasAppConfig
 * @property {ShapeFactory} shapeFactory
 * @property {ConnectionFactory} connectionFactory
 * @property {ConnectionGenerator} connectionGenerator
 * @property {ShapeManager} shapeManager
 * @property {ButtonManager} buttonManager
 * @property {UIManager} uiManager
 * @property {CanvasRenderer} renderer
 */

/**
 * Главный класс приложения
 */
export class CanvasApp extends CanvasAppBase {
  /** @param {CanvasAppConfig} config */
  constructor(config) {
    super(config);
  }

  /**
   * @param {ButtonConfig[]|((self: this) => ButtonConfig[])} buttonConfigs
   * @return {this}
   */
  setButtons(buttonConfigs) {
    const buttons = typeof buttonConfigs === 'function' ? buttonConfigs(this) : buttonConfigs;

    this._buttonManager.setButtons(buttons);
    this._updateUI()

    return this
  }

  /** @return {void} */
  update() {
    this._render()
    this._updateUI()
  }

  /** @return {void} */
  run() {
    this._setupEventListeners();
    this.update();
  }

  /** @return {void} */
  _setupEventListeners() {
    // Выбор фигуры
    this._renderer.canvas.addEventListener('click', (e) => {
      const rect = this._renderer.canvas.getBoundingClientRect();
      const coordinate = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      this._shapeManager.selectedShape = this._shapeManager.getShapeAtPoint(coordinate);

      this.update();
    });

    // Подстройка под размер окна
    window.addEventListener('resize', () => {
      this._renderer.resize();
      this._render();
    });
  }
}
