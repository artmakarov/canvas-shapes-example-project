import { CanvasAppBase } from './canvas-base.app.js';

/**
 * Модель конфигурации для класса {@link CanvasApp}
 * @typedef {Object} CanvasAppConfig
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

  /** @return {void} */
  run() {
    this.render();
    this.updateUI();
  }
}
