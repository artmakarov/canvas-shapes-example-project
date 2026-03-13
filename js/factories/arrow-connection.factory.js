import { ConnectionFactory } from '../abstractions/connection-factory.abstraction.js';
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
