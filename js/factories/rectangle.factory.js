import { ShapeFactory } from '../interfaces/shape-factory.interface.js';
import { Rectangle } from '../models/rectangle.model.js';
import { randomValueOnAxis } from '../utils/index.js';

/**
 * Фабрика для создания прямоугольников
 */
export class RectangleFactory extends ShapeFactory {
  /**
   * @param {ColorPalette} colorPalette
   */
  constructor(colorPalette) {
    super();

    /**
     * @type {ColorPalette}
     * @protected
     */
    this._colorPalette = colorPalette;

    /**
     * @type {number}
     * @protected
     */
    this._shapeWidth = 140;

    /**
     * @type {number}
     * @protected
     */
    this._shapeHeight = 40;

    /**
     * Расстояние от краёв холста
     * @type {number}
     * @protected
     */
    this._padding = 100;
  }

  createShape(input) {
    const { id, canvasWidth, canvasHeight } = input;

    return new Rectangle({
      id,
      name: `Shape${id}`,
      x: randomValueOnAxis(canvasWidth, this._shapeWidth, this._padding),
      y: randomValueOnAxis(canvasHeight, this._shapeHeight, this._padding),
      width: this._shapeWidth,
      height: this._shapeHeight,
      color: this._colorPalette.getRandomColor(),
    });
  }
}
