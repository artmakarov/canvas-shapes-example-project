import { Plugin } from '../abstractions/plugin.abstraction.js';

/**
 * Плагин выбора одной фигуры
 */
export class DefaultSelectionPlugin extends Plugin {
  /** @param {PointerEvent} event */
  canvasClickHandler = (event) => {
    const rect = this.app.canvas.getBoundingClientRect();
    const coordinate = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    const shape = this.app.getShapeAtPoint(coordinate);

    this.app.setSelectedShape(shape);
  }

  /** @return {string} */
  getName() {
    return 'default-selection';
  }

  /** @return {void} */
  onInit() {
    this.app.canvas.addEventListener('click', this.canvasClickHandler);
  }

  /** @return {void} */
  onDestroy() {
    this.app.canvas.removeEventListener('click', this.canvasClickHandler)
  }
}
