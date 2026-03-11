import { CanvasAppBase } from './canvas-base.app.js';
import { DefaultResizePlugin } from '../plugins/default-resize.plugin.js';
import { DefaultSelectionPlugin } from '../plugins/default-selection.plugin.js';

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

    this._registerDefaultPlugins()
  }

  /** @return {void} */
  run() {
    this.render();
    this.updateUI();
  }

  /**
   * @return {void}
   * @protected
   */
  _registerDefaultPlugins() {
    this.registerPlugins([
      new DefaultResizePlugin(),
      new DefaultSelectionPlugin(),
    ])
  }
}
