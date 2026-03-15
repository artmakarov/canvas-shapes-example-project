import { Plugin } from '../abstractions/plugin.abstraction.js';

/**
 * Плагин подстройки размера холста под размер окна
 */
export class DefaultResizePlugin extends Plugin {
  resizeHandler = () => {
    this.app.resize();
    this.app.render();
  }

  /** @return {string} */
  getName() {
    return 'default-resize';
  }

  /** @return {void} */
  onInit() {
    window.addEventListener('resize', this.resizeHandler);
  }

  /** @return {void} */
  onDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  }
}
