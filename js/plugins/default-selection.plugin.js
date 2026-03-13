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
    const shapeAtPoint = this.app.getShapeAtPoint(coordinate);

    if (event.ctrlKey) {
      this._multipleSelection(shapeAtPoint);
    } else {
      this._singleSelection(shapeAtPoint);
    }
  };

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
    this.app.canvas.removeEventListener('click', this.canvasClickHandler);
  }

  /**
   * @param {Shape|null} shapeAtPoint
   * @private
   */
  _singleSelection(shapeAtPoint) {
    // Если не было изменений, то ничего не делаем,
    // чтобы не вызывать рендеринг впустую.
    if (!shapeAtPoint && !this.app.getSelectedShapes().length) {
      return;
    }

    this.app.setSelectedShapes(shapeAtPoint ? [shapeAtPoint] : []);
  }

  /**
   * @param {Shape|null} shapeAtPoint
   * @private
   */
  _multipleSelection(shapeAtPoint) {
    if (!shapeAtPoint) return;

    const selectedShapes = this.app.getSelectedShapes();
    const newSelectedShapes = shapeAtPoint.selected
      ? selectedShapes.filter((selectedShape) => selectedShape !== shapeAtPoint)
      : selectedShapes.concat(shapeAtPoint);

    this.app.setSelectedShapes(newSelectedShapes);
  }
}
