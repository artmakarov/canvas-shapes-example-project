/**
 * Интерфейс для всех фигур на холсте
 * @interface
 */
export class CanvasFigure {
  /**
   * @abstract
   * @param {RenderingContext} ctx
   * @return {void}
   */
  draw(ctx) {
    throw new Error('Метод draw должен быть реализован подклассом!');
  }
}
