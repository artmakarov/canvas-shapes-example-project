import { ButtonManager } from '../abstractions/button-manager.abstraction.js';

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
   * @param {AppStateSnapshot} appStateSnapshot
   * @return {void}
   */
  updateUI(appStateSnapshot) {
    this._updateButtonStates(appStateSnapshot);
    this._updateInfoText(appStateSnapshot);
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
   * @param {AppStateSnapshot} appStateSnapshot
   * @return {void}
   */
  _updateButtonStates(appStateSnapshot) {
    this.buttons.forEach(({ button, config }) => {
      button.disabled = config.isDisabled?.(appStateSnapshot) ?? false;
    });
  }

  /**
   * @param {AppStateSnapshot} appStateSnapshot
   * @return {void}
   */
  _updateInfoText(appStateSnapshot) {
    const { selectedShapes, shapes } = appStateSnapshot
    const info = document.querySelector(this.infoSelector);

    if (!info) return;

    info.textContent = selectedShapes.length
      ? `Выбрано: ${selectedShapes.map((shape) => shape.name)}`
      : `Фигур: ${shapes.length}. Кликните Add для создания.`;
  }
}
