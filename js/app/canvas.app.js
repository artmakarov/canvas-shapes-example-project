import { CanvasBaseApp } from './canvas-base.app.js';

/**
 * Модель конфигурации для класса {@link CanvasApp}
 * @typedef {Object} CanvasAppConfig
 * @property {ConnectionFactory} connectionFactory
 * @property {ConnectionGenerator} connectionGenerator
 * @property {BaseShapeManager} shapeManager
 * @property {BaseButtonUIManager} buttonManager
 * @property {BaseUIManager} uiManager
 * @property {Renderer} renderer
 */

/**
 * Главный класс приложения
 */
export class CanvasApp extends CanvasBaseApp {
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
