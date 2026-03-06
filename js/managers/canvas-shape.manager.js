import { ShapeManager } from '../interfaces/shape.manager.js';

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
     *
     * @type {Shape|null}
     * @protected
     */
    this._selectedShape = null;

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

  /** @return {Shape|null} */
  get selectedShape() {
    return this._selectedShape;
  }

  /**
   * @param {Shape|null} shape
   * @return {void}
   */
  set selectedShape(shape) {
    if (this._selectedShape) {
      this._selectedShape.unselect();
    }

    this._selectedShape = shape;

    if (shape) {
      shape.select();
    }
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
    this._shapes = [];
    this._selectedShape = null;
    this._nextShapeId = 1;
  }

  /**
   * @param {Coordinate} coordinate
   * @return {Shape|null}
   */
  getShapeAtPoint(coordinate) {
    return this._shapes.find((shape) => shape.containsPoint(coordinate)) || null;
  }

  /** @return {Shape[]} */
  getAllShapes() {
    return [...this._shapes];
  }
}
