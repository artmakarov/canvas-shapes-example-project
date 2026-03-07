import { ColorPalette } from './color-palette.model.js';

export class ContrastColorPalette extends ColorPalette {
  constructor() {
    super();

    this._colors = [
      '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF',
    ];
  }
}
