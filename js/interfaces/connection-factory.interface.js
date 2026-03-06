/**
 * Интерфейс для фабрики создания соединений
 * @interface
 */
export class ConnectionFactory {
  /**
   * @abstract
   * @param {ConnectionProperties} properties
   * @return {Connection}
   */
  createConnection(properties) {
    throw new Error('Метод createConnection должен быть реализован подклассом!');
  }
}
