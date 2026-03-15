import { BaseUIManager } from './base-ui-manager.abstraction.js';

/**
 * @typedef {(appStateSnapshot: AppStateSnapshot) => void} UpdateUICallback
 */

/**
 * @typedef {() => void} RemoveUpdateUICallback
 */

/**
 * Абстрактный класс для управления кнопками
 * @abstract
 */
export class BaseAppUIManager extends BaseUIManager {
  /**
   @abstract
   * @param {UpdateUICallback} callback
   * @return {RemoveUpdateUICallback}
   */
  onUpdateUI(callback) {
    throw new Error('Метод onUpdateUI должен быть реализован подклассом!');
  }
}
