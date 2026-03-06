import { ConnectionGenerator } from '../interfaces/connection-generator.interface.js';

/**
 * Реализация генератора соединений
 */
export class SmartConnectionGenerator extends ConnectionGenerator {
  /**
   * @param {Shape[]} shapes
   * @param {ConnectionFactory} connectionFactory
   * @return {Connection[]}
   */
  generateConnections(shapes, connectionFactory) {
    const connections = [];
    const usedEdges = new Set();

    for (let i = 1; i < shapes.length; i++) {
      const fromShape = shapes[i - 1];
      const toShape = shapes[i];

      const fromEdges = ['right', 'bottom', 'left', 'top'];
      const toEdges = ['left', 'top', 'right', 'bottom'];

      let minDist = Infinity;
      let bestConnection = null;

      for (const fromEdge of fromEdges) {
        if (this._isEdgeUsed(fromShape.id, fromEdge, usedEdges)) continue;

        for (const toEdge of toEdges) {
          if (this._isEdgeUsed(toShape.id, toEdge, usedEdges)) continue;

          const fromPoint = fromShape.getEdgePoint(fromEdge);
          const toPoint = toShape.getEdgePoint(toEdge);
          const dist = Math.hypot(fromPoint.x - toPoint.x, fromPoint.y - toPoint.y);

          if (dist < minDist) {
            minDist = dist;
            bestConnection = connectionFactory.createConnection({
              startX: fromPoint.x,
              startY: fromPoint.y,
              endX: toPoint.x,
              endY: toPoint.y,
              fromEdge,
              toEdge,
            });
          }
        }
      }

      if (bestConnection) {
        usedEdges.add(this._getEdgeKey(fromShape.id, bestConnection.fromEdge));
        usedEdges.add(this._getEdgeKey(toShape.id, bestConnection.toEdge));

        connections.push(bestConnection);
      }
    }

    return connections;
  }

  /**
   * @param {number} shapeId
   * @param {Edge} edge
   * @param {Set<string>} usedEdges
   * @return {boolean}
   */
  _isEdgeUsed(shapeId, edge, usedEdges) {
    return usedEdges.has(this._getEdgeKey(shapeId, edge));
  }

  /**
   * @param {number} shapeId
   * @param {Edge} edge
   * @return {string}
   */
  _getEdgeKey(shapeId, edge) {
    return `${shapeId}_${edge}`;
  }
}
