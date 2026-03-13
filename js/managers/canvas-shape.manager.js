import { ShapeManager } from '../abstractions/shape-manager.abstraction.js';

/** Реализация менеджера фигур */
export class CanvasShapeManager extends ShapeManager {
  constructor() {
    super();

    /**
     * @type {Shape[]}
     * @protected
     */
    this._shapes = [];

    /**
     * @type {Shape[]}
     * @protected
     */
    this._selectedShapes = [];

    /**
     * @type {number}
     * @protected
     */
    this._nextShapeId = 1;
  }

  /** @return {number} */
  get nextShapeId() {
    return this._nextShapeId;
  }

  /** @return {Shape[]} */
  get selectedShapes() {
    return this._selectedShapes.slice();
  }

  /** @param {Shape[]} shapes */
  set selectedShapes(shapes) {
    if (this._selectedShapes.length) {
      for (const selectedShape of this._selectedShapes) {
        selectedShape.unselect()
      }
    }

    if (shapes.length) {
      for (const shape of shapes) {
        shape.select()
      }
    }

    this._selectedShapes = shapes;
  }

  /**
   * @param {Shape} shape
   * @return {void}
   */
  addShape(shape) {
    this._shapes.push(shape);
    this._nextShapeId++;
  }

  /**
   * @param {Shape} shape
   * @return {void}
   */
  removeShape(shape) {
    const index = this._shapes.indexOf(shape);

    if (index !== -1) {
      this._shapes.splice(index, 1);
    }
  }

  /** @return {void} */
  clear() {
    this._selectedShapes = [];
    this._shapes = [];
    this._nextShapeId = 1;
  }

  /**
   * @param {Coordinate} coordinate
   * @return {Shape|null}
   */
  getShapeAtPoint(coordinate) {
    /** @type {Shape|null} */
    let shapeAtPoint = null;

    /*
     Находим фигуру с наибольшим индексом в массиве.
     Почему применяется `for`?
     Потому что самый быстрый.
     ...но стоит сравнить/перепроверить с другими алгоритмами!
     */
    for (let i = this._shapes.length - 1; i >= 0; i-=1) {
      const shape = this._shapes[i];

      if (shape.containsPoint(coordinate)) {
        shapeAtPoint = shape;
        break;
      }
    }

    return shapeAtPoint;
  }

  /** @return {Shape[]} */
  getAllShapes() {
    return this._shapes.slice();
  }
}
