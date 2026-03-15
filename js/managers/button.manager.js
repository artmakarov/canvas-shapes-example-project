import { BaseButtonUIManager } from '../abstractions/base-button-ui-manager.abstraction.js';

/**
 * Реализация менеджера кнопок
 */
export class ButtonManager extends BaseButtonUIManager {
  /** @param {HTMLElement} container - HTML элемент для контейнера кнопок */
  constructor(container) {
    super();

    this.container = container;

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
    this.container.innerHTML = '';

    // Создаем кнопки
    buttonConfigs.forEach((config) => {
      const button = this._createButtonElement(config, this.container);

      this.buttons.set(config.id, { button, config });
    });
  }

  /**
   * @param {AppStateSnapshot} appStateSnapshot
   * @return {void}
   */
  updateUI(appStateSnapshot) {
    this.buttons.forEach(({ button, config }) => {
      button.disabled = config.isDisabled?.(appStateSnapshot) ?? false;
    });
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
}
