import { ShapeFactory } from '../interfaces/shape-factory.interface.js';
import { Rectangle } from '../models/rectangle.model.js';

/**
 * Фабрика для создания прямоугольников
 */
export class RectangleFactory extends ShapeFactory {
  /**
   * @param {number} id
   * @return {Rectangle}
   */
  createShape(id) {
    return new Rectangle({
      id,
      name: `Shape${id}`,
      x: Math.random() * 600 + 100,
      y: Math.random() * 400 + 50,
      width: 140,
      height: 40,
      color: RectangleFactory.GetRandomColor(),
    });
  }

  /** @return {string} */
  static GetRandomColor() {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
      '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }
}
