import { ConnectionGenerator } from '../abstractions/connection-generator.abstraction.js';

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
    /** @type {Connection[]} */
    const connections = [];
    /** @type {Set<string>} */
    const usedEdges = new Set();

    for (let i = 1, l = shapes.length; i < l; i+=1) {
      const fromShape = shapes[i - 1];
      const toShape = shapes[i];
      const bestConnection = this._findBestConnection(fromShape, toShape, usedEdges);

      if (!bestConnection) continue;

      usedEdges.add(this._getEdgeKey(fromShape.id, bestConnection.fromEdge));
      usedEdges.add(this._getEdgeKey(toShape.id, bestConnection.toEdge));

      connections.push(connectionFactory.createConnection(bestConnection));
    }

    return connections;
  }

  /**
   * @param {number} shapeId
   * @param {Edge} edge
   * @return {string}
   */
  _getEdgeKey(shapeId, edge) {
    return `${shapeId}_${edge}`;
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
   * @param {Shape} fromShape
   * @param {Shape} toShape
   * @param {Set<string>} usedEdges
   * @return {ConnectionProperties|null}
   */
  _findBestConnection(fromShape, toShape, usedEdges) {
    /**
     * Порядок точек на фигуре для предпочтительного исходящего и входящего соединения
     * @type {{from: Edge[], to: Edge[]}}
     */
    const edgesPriority = {
      from: [
        'right', 'right-top', 'right-bottom', 'bottom', 'bottom-right', 'bottom-left',
        'left', 'left-top', 'left-bottom', 'top', 'top-right', 'top-left'
      ],
      to: [
        'left', 'left-bottom', 'left-top', 'top', 'top-left', 'top-right',
        'right', 'right-bottom', 'right-top', 'bottom', 'bottom-left', 'bottom-right'
      ],
    };

    /** @type {number} */
    let minDist = Infinity;
    /** @type {ConnectionProperties|null} */
    let bestConnection = null;

    for (const fromEdge of edgesPriority.from) {
      if (this._isEdgeUsed(fromShape.id, fromEdge, usedEdges)) continue;

      for (const toEdge of edgesPriority.to) {
        if (this._isEdgeUsed(toShape.id, toEdge, usedEdges)) continue;

        const fromPoint = fromShape.getEdgePoint(fromEdge);
        const toPoint = toShape.getEdgePoint(toEdge);

        if (!fromPoint || !toPoint) continue;

        const dist = Math.hypot(fromPoint.x - toPoint.x, fromPoint.y - toPoint.y);

        if (dist < minDist) {
          minDist = dist;
          bestConnection = {
            fromEdge,
            toEdge,
            startX: fromPoint.x,
            startY: fromPoint.y,
            endX: toPoint.x,
            endY: toPoint.y,
          };
        }
      }
    }

    return bestConnection;
  }
}
