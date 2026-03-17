/**
 * Carrot Enemy - Basic walking enemy
 */

import { BaseEnemy } from './base-enemy.js';

export class Carrot extends BaseEnemy {
    constructor(x, y) {
        super(x, y, 'carrot');
        this.width = 40;
        this.height = 50;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        
        // Carrot body (orange triangle)
        ctx.fillStyle = '#FF6B35';
        ctx.beginPath();
        ctx.moveTo(0, -this.height / 2);
        ctx.lineTo(this.width / 2, this.height / 2);
        ctx.lineTo(-this.width / 2, this.height / 2);
        ctx.closePath();
        ctx.fill();
        
        // Carrot lines (texture)
        ctx.strokeStyle = '#E55A2B';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-10, -10);
        ctx.lineTo(10, -5);
        ctx.moveTo(-12, 0);
        ctx.lineTo(12, 5);
        ctx.moveTo(-8, 10);
        ctx.lineTo(8, 15);
        ctx.stroke();
        
        // Green leaves on top
        ctx.fillStyle = '#4CAF50';
        const leafOffset = Math.sin(this.animFrame * Math.PI / 2) * 3;
        ctx.beginPath();
        ctx.moveTo(-5 + leafOffset, -this.height / 2);
        ctx.lineTo(-10, -this.height / 2 - 15);
        ctx.lineTo(0, -this.height / 2 - 10);
        ctx.lineTo(10, -this.height / 2 - 15);
        ctx.lineTo(5 + leafOffset, -this.height / 2);
        ctx.closePath();
        ctx.fill();
        
        // Angry eyes
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(-8, -5, 6, 0, Math.PI * 2);
        ctx.arc(8, -5, 6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(-6, -5, 3, 0, Math.PI * 2);
        ctx.arc(10, -5, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Angry eyebrows
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-12, -12);
        ctx.lineTo(-4, -8);
        ctx.moveTo(12, -12);
        ctx.lineTo(4, -8);
        ctx.stroke();
        
        ctx.restore();
    }
}

export default Carrot;
