/**
 * @template T
 * @typedef {T} InjectionEvent
 */

/** Типы событий приложения */
export const EventType = Object.freeze({
  SHAPE_ADDED: /** @type InjectionEvent<{shape:Shape}> */ 'shape:added',
  SHAPE_REMOVED: /** @type InjectionEvent<{shape:Shape}> */ 'shape:removed',
  SHAPES_SELECTED: /** @type InjectionEvent<{shapes:Shape[]}> */ 'shapes:selected',
  SHAPES_CLEARED: /** @type InjectionEvent<void> */ 'shapes:cleared',
  UI_UPDATE: /** @type InjectionEvent<void> */ 'ui:update',
  RENDER: /** @type InjectionEvent<void> */ 'render',
  RESIZE: /** @type InjectionEvent<void> */ 'resize',
  PLUGIN_INIT: /** @type InjectionEvent<{pluginName:string}> */ 'plugin:init',
  PLUGIN_DESTROYED: /** @type InjectionEvent<{pluginName:string}> */ 'plugin:destroyed',
});
