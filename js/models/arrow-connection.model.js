import { Connection } from '../interfaces/connection.interface.js';

export class ArrowConnection extends Connection {
  static color = '#777';

  /** @override */
  draw(ctx) {
    if (!(ctx instanceof CanvasRenderingContext2D)) {
      console.warn('ArrowConnection поддерживает только CanvasRenderingContext2D');
      return;
    }

    ctx.strokeStyle = ArrowConnection.color;
    ctx.lineWidth = 1;

    // Линия
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();

    // Треугольник
    const arrowSize = 8;
    const angle = Math.atan2(this.endY - this.startY, this.endX - this.startX);
    ctx.save();
    ctx.translate(this.endX, this.endY);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-arrowSize, -arrowSize / 2);
    ctx.lineTo(-arrowSize, arrowSize / 2);
    ctx.closePath();
    ctx.fillStyle = ArrowConnection.color;
    ctx.fill();
    ctx.restore();
  }
}
