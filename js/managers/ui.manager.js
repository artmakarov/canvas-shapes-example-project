import { BaseAppUIManager } from '../abstractions/base-app-ui-manager.abstraction.js';

/**
 * @typedef {Object} UIManagerOptions
 * @property {BaseButtonUIManager} buttonManager
 */

/**  Реализация менеджера UI */
export class UIManager extends BaseAppUIManager {
  /** @param {UIManagerOptions} options */
  constructor(options) {
    super();

    /** @type {UpdateUICallback[]} */
    this.updateUICallbacks = [];

    this.buttonManager = options.buttonManager;
  }

  /**
   * Добавляет функцию обратного вызова при обновлении UI
   * @param {UpdateUICallback} callback
   * @return {RemoveUpdateUICallback}
   */
  onUpdateUI(callback) {
    this.updateUICallbacks.push(callback);

    return () => {
      this.updateUICallbacks.splice(this.updateUICallbacks.indexOf(callback), 1);
    }
  }

  /**
   * @param {AppStateSnapshot} appStateSnapshot
   * @return {void}
   */
  updateUI(appStateSnapshot) {
    this.buttonManager.updateUI(appStateSnapshot);

    for (const callback of this.updateUICallbacks) {
      try {
        callback(appStateSnapshot);
      } catch (error) {
        console.error(`Ошибка при вызове callback обновления UI:`, error);
      }
    }
  }
}
