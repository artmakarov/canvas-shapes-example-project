import { Plugin } from '../abstractions/plugin.abstraction.js';

/**
 * Плагин выбора одной фигуры
 */
export class DefaultSelectionPlugin extends Plugin {
  /** @param {PointerEvent} event */
  canvasClickHandler = (event) => {
    const rect = this.app.renderer.canvas.getBoundingClientRect();
    const coordinate = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    this.app.shapeManager.selectedShape =
      this.app.shapeManager.getShapeAtPoint(coordinate);

    this.app.render();
    this.app.updateUI();
  }

  /** @return {string} */
  getName() {
    return 'default-selection';
  }

  /** @return {void} */
  onInit() {
    this.app.renderer.canvas.addEventListener('click', this.canvasClickHandler);
  }

  /** @return {void} */
  onDestroy() {
    this.app.renderer.canvas.removeEventListener('click', this.canvasClickHandler)
  }
}
