import { ArrowConnectionFactory } from '../factories/arrow-connection.factory.js';
import { Canvas2DRenderer } from '../renderers/canvas-2d.renderer.js';
import { CanvasButtonManager } from '../managers/canvas-button.manager.js';
import { CanvasShapeManager } from '../managers/canvas-shape.manager.js';
import { CanvasUIManager } from '../managers/canvas-ui.manager.js';
import { RectangleFactory } from '../factories/rectangle.factory.js';
import { ColorPalette } from '../models/color-palette.model.js';
import { SmartConnectionGenerator } from '../generators/smart-connection.generator.js';

/**
 * Модель конфигурации для класса {@link CanvasAppBase}
 * @typedef {Object} CanvasAppBaseConfig
 * @property {ShapeFactory} [shapeFactory]
 * @property {ConnectionFactory} [connectionFactory]
 * @property {ConnectionGenerator} [connectionGenerator]
 * @property {ShapeManager} [shapeManager]
 * @property {ButtonManager} [buttonManager]
 * @property {UIManager} [uiManager]
 * @property {Renderer} [renderer]
 */

/**
 * Базовый класс приложения
 */
export class CanvasAppBase {
  /** @param {CanvasAppBaseConfig} config */
  constructor(config) {
    this._shapeFactory = config.shapeFactory || new RectangleFactory(new ColorPalette());
    this._connectionFactory = config.connectionFactory || new ArrowConnectionFactory();
    this._connectionGenerator = config.connectionGenerator || new SmartConnectionGenerator();
    this._shapeManager = config.shapeManager || new CanvasShapeManager();
    this._buttonManager = config.buttonManager || new CanvasButtonManager();
    this._uiManager = config.uiManager || new CanvasUIManager(this._buttonManager);
    this._renderer = config.renderer || new Canvas2DRenderer(
      document.getElementById('canvasWrapper'),
      document.getElementById('canvas'),
    );
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
