/**
 * Абстрактный класс для генерации соединений между фигурами
 * @abstract
 */
export class ConnectionGenerator {
  /**
   * @abstract
   * @param {Shape[]} shapes
   * @param {ConnectionFactory} connectionFactory
   * @return {Connection[]}
   */
  generateConnections(shapes, connectionFactory) {
    throw new Error('Метод generateConnections должен быть реализован подклассом!');
  }
}
