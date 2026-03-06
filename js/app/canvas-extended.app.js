import { CanvasApp } from './canvas.app.js';

/**
 * Модель конфигурации для класса {@link CanvasAppExtended}
 * @typedef {Object} CanvasAppExtendedConfig
 * @property {ShapeFactory} shapeFactory
 * @property {ConnectionFactory} connectionFactory
 * @property {ConnectionGenerator} [connectionGenerator]
 * @property {ShapeManager} shapeManager
 * @property {ButtonManager} [buttonManager]
 * @property {UIManager} [uiManager]
 * @property {Renderer} renderer
 */

/**
 * Расширенная версия приложения с дополнительными функциями
 */
export class CanvasAppExtended extends CanvasApp {
  /** @param {CanvasAppExtendedConfig} config */
  constructor(config) {
    super(config);
  }

  /** @return {void} */
  _setupButtons() {
    /**
     * Расширенная конфигурация кнопок - легко добавлять новые!
     * @type {ButtonConfig[]}
     */
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

      // Новые кнопки
      {
        id: 'randomizeBtn',
        text: 'Randomize',
        className: 'button_warning',
        isDisabled: (shapeCount) => !shapeCount,
        action: () => this._randomizeShapes(),
      },
      {
        id: 'resetBtn',
        text: 'Reset',
        className: 'button_secondary',
        action: () => this._resetCanvas(),
      },
      {
        id: 'infoBtn',
        text: 'Info',
        className: 'button_secondary',
        action: () => this._showInfo(),
      },
    ];

    this._buttonManager.setButtons(buttonConfigs);
  }

  /** @return {void} */
  _randomizeShapes() {
    this._shapeManager.randomizeShapes(this._renderer.canvasWrapper);
    this._render();
    this._updateUI();
  }

  /** @return {void} */
  _resetCanvas() {
    this._shapeManager.resetShapes();
    this._render();
    this._updateUI();
  }

  /** @return {void} */
  _showInfo() {
    const shapes = this._shapeManager.getAllShapes();
    const selectedShape = this._shapeManager.selectedShape;

    let infoText = `Статистика:\n`;
    infoText += `Всего фигур: ${shapes.length}\n`;
    infoText += `Выбрано: ${selectedShape?.name ?? 'Нет'}`;

    alert(infoText);
  }
}
