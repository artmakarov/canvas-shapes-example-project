/**
 * Интерфейс для рендеринга
 * @interface
 */
export class Renderer {
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
