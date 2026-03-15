/**
 * Абстрактный класс для всех фигур на холсте
 * @abstract
 */
export class BaseFigure {
  /**
   * @abstract
   * @param {RenderingContext} ctx
   * @return {void}
   */
  draw(ctx) {
    throw new Error('Метод draw должен быть реализован подклассом!');
  }
}
