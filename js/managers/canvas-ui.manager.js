import { UIManager } from '../interfaces/ui-manager.interface.js';

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
   * @param {number} shapeCount
   * @param {Shape|null} selectedShape
   * @return {void}
   */
  update(shapeCount, selectedShape) {
    this.buttonManager.updateUI(shapeCount, selectedShape);
  }
}
