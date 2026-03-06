import { ButtonManager } from '../interfaces/button-manager.interface.js';

/**
 * Реализация менеджера кнопок
 */
export class CanvasButtonManager extends ButtonManager {
  /**
   * @param {string} toolbarSelector - CSS селектор для контейнера кнопок
   * @param {string} infoSelector - CSS селектор для информационного элемента
   */
  constructor(toolbarSelector = '.toolbar', infoSelector = '#info') {
    super();

    this.toolbarSelector = toolbarSelector;
    this.infoSelector = infoSelector;

    /** @type {Map<string, {button: HTMLButtonElement, config: ButtonConfig}>} */
    this.buttons = new Map();
  }

  /**
   * @param {ButtonConfig[]} buttonConfigs
   * @return {void}
   */
  setButtons(buttonConfigs) {
    this.buttons.clear();

    // Очищаем контейнер
    const toolbar = document.querySelector(this.toolbarSelector);
    toolbar.innerHTML = '';

    // Создаем кнопки
    buttonConfigs.forEach((config) => {
      const button = this._createButtonElement(config, toolbar);

      this.buttons.set(config.id, { button, config });
    });
  }

  /**
   * @param {number} shapeCount
   * @param {Shape|null} selectedShape
   * @return {void}
   */
  updateUI(shapeCount, selectedShape) {
    this._updateButtonStates(shapeCount, selectedShape);
    this._updateInfoText(shapeCount, selectedShape);
  }

  /**
   * @param {ButtonConfig} config
   * @param {HTMLElement} container
   * @return {HTMLButtonElement}
   */
  _createButtonElement(config, container) {
    const button = document.createElement('button');

    button.id = config.id;
    button.className = `button ${config.className}`;
    button.textContent = config.text;
    button.addEventListener('click', (e) => config.action(e));

    container.appendChild(button);

    return button;
  }

  /**
   * @param {number} shapeCount
   * @param {Shape|null} selectedShape
   * @return {void}
   */
  _updateButtonStates(shapeCount, selectedShape) {
    this.buttons.forEach(({ button, config }) => {
      button.disabled = config.isDisabled?.(shapeCount, selectedShape) ?? false;
    });
  }

  /**
   * @param {number} shapeCount
   * @param {Shape|null} selectedShape
   * @return {void}
   */
  _updateInfoText(shapeCount, selectedShape) {
    const info = document.querySelector(this.infoSelector);

    if (!info) return;

    info.textContent = selectedShape
      ? `Выбрана: ${selectedShape.name}`
      : `Фигур: ${shapeCount}. Кликните Add для создания.`;
  }
}
