/**
 * @template T
 * @typedef {Object} EventData
 * @property {number} timestamp
 * @property {T} [payload]
 */

/**
 * @template T
 * @typedef {(eventData: EventData<T>) => void} EventCallback
 */

/**
 * @typedef {() => void} UnsubscribeFunction
 */

export class EventManager {
  /** @type {EventManager|null} */
  static instance = null;

  constructor() {
    /**
     * @type {Map<string, {callback: EventCallback}[]>}
     * @protected
     */
    this._events = new Map();
  }

  /** @return {EventManager} */
  static getInstance() {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager();
    }

    return EventManager.instance;
  }

  /**
   * @template T
   * @param {InjectionEvent<T>|string} event
   * @param {EventCallback<T>} callback
   * @return {UnsubscribeFunction}
   */
  on(event, callback) {
    if (!this._events.has(event)) {
      this._events.set(event, []);
    }

    const listeners = this._events.get(event);
    listeners.push({ callback });

    return () => this.off(event, callback);
  }

  /**
   * @template T
   * @param {InjectionEvent<T>|string} event
   * @param {EventCallback<T>} callback
   * @return {void}
   */
  off(event, callback) {
    const listeners = this._events.get(event);

    if (!listeners) return;

    const index = listeners
      .findIndex((listener) => listener.callback === callback);

    if (index > -1) {
      listeners.splice(index, 1);
    }

    if (!listeners.length) {
      this._events.delete(event);
    }
  }

  /**
   * @template T
   * @param {InjectionEvent<T>|string} event
   * @param {EventCallback<T>} callback
   * @return {UnsubscribeFunction}
   */
  once(event, callback) {
    /** @param {EventData} eventData */
    const wrapper = (eventData) => {
      callback(eventData);
      this.off(event, wrapper);
    };

    return this.on(event, wrapper);
  }

  /**
   * @template T
   * @param {InjectionEvent<T>|string} event
   * @param {T} [payload]
   * @return {void}
   */
  emit(event, payload) {
    const listeners = this._events.get(event);

    if (!listeners?.length) return;

    /** @type {EventData} */
    const eventData = {
      payload,
      timestamp: Date.now(),
    };

    for (const { callback } of listeners) {
      try {
        callback(eventData);
      } catch (error) {
        console.error(`Ошибка в обработчике событий для "${event}":`, error);
      }
    }
  }

  /**
   * @template T
   * @param {InjectionEvent<T>|string} event
   * @return {boolean}
   */
  hasListeners(event) {
    return !!this._events.get(event)?.length;
  }

  /** @return {void} */
  clear() {
    this._events.clear();
  }
}
