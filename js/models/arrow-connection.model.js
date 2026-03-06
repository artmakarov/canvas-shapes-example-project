import { Connection } from '../interfaces/connection.js';

export class ArrowConnection extends Connection {
  draw(ctx) {
    ctx.strokeStyle = '#777';
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
    ctx.fillStyle = '#777';
    ctx.fill();
    ctx.restore();
  }
}
