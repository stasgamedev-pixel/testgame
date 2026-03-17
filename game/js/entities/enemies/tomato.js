/**
 * Tomato Enemy - Rolling enemy
 */

import { BaseEnemy } from './base-enemy.js';

export class Tomato extends BaseEnemy {
    constructor(x, y) {
        super(x, y, 'tomato');
        this.width = 48;
        this.height = 48;
        this.rotation = 0;
    }
    
    update(deltaTime, gameSpeed) {
        super.update(deltaTime, gameSpeed);
        
        // Rotate while moving
        this.rotation += gameSpeed * 5 * deltaTime;
        
        return this.x + this.width < 0;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        
        // Tomato body (red circle)
        ctx.fillStyle = '#E53935';
        ctx.beginPath();
        ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Shine/highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(-10, -10, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Green stem on top
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(-4, -this.height / 2 - 8, 8, 10);
        
        // Leaf
        ctx.beginPath();
        ctx.ellipse(0, -this.height / 2 - 8, 15, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Angry eyes (rotated with the tomato)
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(-12, -5, 7, 0, Math.PI * 2);
        ctx.arc(12, -5, 7, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(-10, -5, 3, 0, Math.PI * 2);
        ctx.arc(14, -5, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Angry eyebrows
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-18, -12);
        ctx.lineTo(-8, -6);
        ctx.moveTo(18, -12);
        ctx.lineTo(8, -6);
        ctx.stroke();
        
        // Evil grin
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 8, 10, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();
        
        ctx.restore();
    }
}

export default Tomato;
