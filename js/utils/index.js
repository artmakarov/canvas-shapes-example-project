/**
 * @param {number} max - Максимальное значение оси
 * @param {number} size - Размер фигуры
 * @param {number} padding - Отступ от границ координат
 * @return {number}
 */
export function randomValueOnAxis(max, size, padding) {
  const min = padding;
  const maxPosition = Math.max(min, max - size - padding);

  return Math.random() * (maxPosition - min) + min;
}
