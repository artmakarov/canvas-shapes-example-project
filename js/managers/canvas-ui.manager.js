import { UIManager } from '../abstractions/ui-manager.abstraction.js';

/**
 * Реализация менеджера UI с использованием ButtonManager
 */
export class CanvasUIManager extends UIManager {
  /**
   * @param {ButtonManager} buttonManager
   */
  constructor(buttonManager) {
    super();

    this.buttonManager = buttonManager;
  }

  /**
   * @param {AppStateSnapshot} appStateSnapshot
   * @return {void}
   */
  update(appStateSnapshot) {
    this.buttonManager.updateUI(appStateSnapshot);
  }
}
