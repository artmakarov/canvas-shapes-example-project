import { BaseUIManager } from '../abstractions/base-ui-manager.abstraction.js';

/**
 * @typedef {Object} UIManagerOptions
 * @property {BaseButtonUIManager} buttonManager
 */

/**  Реализация менеджера UI */
export class UIManager extends BaseUIManager {
  /** @param {UIManagerOptions} options */
  constructor(options) {
    super();

    this.buttonManager = options.buttonManager;
  }

  /**
   * @param {AppStateSnapshot} appStateSnapshot
   * @return {void}
   */
  updateUI(appStateSnapshot) {
    this.buttonManager.updateUI(appStateSnapshot);
  }
}
