/**
 * Интерфейс для рендеринга
 * @interface
 */
export class CanvasRenderer {
  /** @param {HTMLCanvasElement} canvas */
  constructor(canvas) {
    this.canvas = canvas;
  }

  /**
   * @abstract
   * @return {void}
   */
  resize() {
    throw new Error('Метод resize должен быть реализован подклассом!');
  }

  /**
   * @abstract
   * @param {Shape[]} shapes
   * @param {Connection[]} connections
   * @return {void}
   */
  render(shapes, connections) {
    throw new Error('Метод render должен быть реализован подклассом!');
  }
}
