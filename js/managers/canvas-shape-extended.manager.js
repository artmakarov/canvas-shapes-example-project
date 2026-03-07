import { CanvasShapeManager } from './canvas-shape.manager.js';
import { RectangleFactory } from '../factories/rectangle.factory.js';
import { ColorPalette } from '../models/color-palette.model.js';

/**
 * Расширенная реализация менеджера фигур с дополнительными функциями
 */
export class CanvasShapeManagerExtended extends CanvasShapeManager {
  /**
   * Перемешивает фигуры по новым случайным координатам
   * @param {HTMLElement} container
   * @return {void}
   */
  randomizeShapes(container) {
    const maxWidth = container.clientWidth - /* ширина прямоугольника */ 140;
    const maxHeight = container.clientHeight - /* высота прямоугольника */ 40;

    this._shapes.forEach((shape) => {
      shape.x = Math.random() * maxWidth + 50;
      shape.y = Math.random() * maxHeight + 50;
    });
  }

  /**
   * Сбрасывает все фигуры в начальное состояние
   * @param {{ canvasWidth: number; canvasHeight: number }} input
   * @return {void}
   */
  resetShapes(input) {
    const { canvasWidth, canvasHeight } = input;
    const rectangleFactory = new RectangleFactory(new ColorPalette());

    this.clear();

    // Создаем 3 начальные фигуры
    for (let i = 1; i <= 3; i++) {
      const shape = rectangleFactory.createShape({
        id: i,
        canvasWidth,
        canvasHeight,
      });

      this.addShape(shape);
    }
  }
}
