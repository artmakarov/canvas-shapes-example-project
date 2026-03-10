import { CanvasRenderer } from '../interfaces/canvas-renderer.interface.js';

/**
 * Реализация рендерера холста
 */
export class Canvas2DRenderer extends CanvasRenderer {
  /**
   * @param {HTMLElement} canvasWrapper
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvasWrapper, canvas) {
    super(canvas);

    this.canvasWrapper = canvasWrapper;
    this.ctx = canvas.getContext('2d');

    this.resize();
  }

  /**
   * @param {number} width
   * @param {number} height
   * @return {void}
   */
  setSize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  /** @return {void} */
  resize() {
    const { clientWidth, clientHeight } = this.canvasWrapper

    this.setSize(clientWidth, clientHeight);
  }

  /**
   * @param {Shape[]} shapes
   * @param {Connection[]} connections
   * @return {void}
   */
  render(shapes, connections) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    shapes.forEach((shape) => shape.draw(this.ctx));
    connections.forEach((connection) => connection.draw(this.ctx));
  }
}
