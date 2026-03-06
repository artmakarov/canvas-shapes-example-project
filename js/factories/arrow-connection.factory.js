import { ConnectionFactory } from '../interfaces/connection-factory.interface.js';
import { ArrowConnection } from '../models/arrow-connection.model.js';

/**
 * Фабрика для создания стрелочных соединений
 */
export class ArrowConnectionFactory extends ConnectionFactory {
  /**
   * @param {ConnectionProperties} properties
   * @return {ArrowConnection}
   */
  createConnection(properties) {
    return new ArrowConnection(properties);
  }
}
