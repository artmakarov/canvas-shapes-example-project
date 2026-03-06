import { CanvasAppBase } from './canvas-base.app.js';

/**
 * Модель конфигурации для класса {@link CanvasApp}
 * @typedef {Object} CanvasAppConfig
 * @property {ShapeFactory} shapeFactory
 * @property {ConnectionFactory} connectionFactory
 * @property {ConnectionGenerator} connectionGenerator
 * @property {ShapeManager} shapeManager
 * @property {ButtonManager} [buttonManager]
 * @property {UIManager} [uiManager]
 * @property {Renderer} renderer
 */

/**
 * Главный класс приложения
 */
export class CanvasApp extends CanvasAppBase {
  /** @param {CanvasAppConfig} config */
  constructor(config) {
    super(config);

    this._setupButtons();
    this._setupEventListeners();
    this._render();
    this._updateUI();
  }

  /** @return {void} */
  _setupButtons() {
    /** @type {ButtonConfig[]} */
    const buttonConfigs = [
      {
        id: 'addBtn',
        text: 'Add',
        className: 'button_success',
        action: () => this._addShape(),
      },
      {
        id: 'deleteBtn',
        text: 'Delete',
        className: 'button_danger',
        isDisabled: (shapeCount, selectedShape) => !selectedShape,
        action: () => this._deleteSelectedShape(),
      },
      {
        id: 'clearBtn',
        text: 'Clear',
        className: 'button_secondary',
        isDisabled: (shapeCount) => !shapeCount,
        action: () => this._clearCanvas(),
      },
    ];

    this._buttonManager.setButtons(buttonConfigs);
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

      this._render();
      this._updateUI();
    });

    // Подстройка под размер окна
    window.addEventListener('resize', () => {
      this._renderer.resize();
      this._render();
    });
  }

  /** @return {void} */
  _addShape() {
    const shape = this._shapeFactory.createShape(this._shapeManager.nextShapeId);

    this._shapeManager.addShape(shape);
    this._render();
    this._updateUI();
  }

  /** @return {void} */
  _deleteSelectedShape() {
    const selectedShape = this._shapeManager.selectedShape;

    if (selectedShape) {
      this._shapeManager.removeShape(selectedShape);
      this._shapeManager.selectedShape = null;
      this._render();
      this._updateUI();
    }
  }

  /** @return {void} */
  _clearCanvas() {
    this._shapeManager.clear();
    this._render();
    this._updateUI();
  }
}
