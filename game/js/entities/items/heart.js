/**
 * Heart Item - Health pickup
 */

import CONSTANTS from '../core/constants.js';

export class Heart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = CONSTANTS.HEART_WIDTH;
        this.height = CONSTANTS.HEART_HEIGHT;
        this.collected = false;
        this.animTimer = 0;
        this.pulseScale = 1;
    }
    
    update(deltaTime, gameSpeed) {
        // Move left with game speed
        this.x -= CONSTANTS.PLAYER_SPEED * gameSpeed * deltaTime;
        
        // Pulsing animation
        this.animTimer += deltaTime;
        this.pulseScale = 1 + Math.sin(this.animTimer * 3) * 0.15;
        
        // Remove if off screen
        return this.x + this.width < 0;
    }
    
    draw(ctx) {
        if (this.collected) return;
        
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.scale(this.pulseScale, this.pulseScale);
        
        // Draw heart shape
        ctx.fillStyle = '#E91E63';
        ctx.beginPath();
        
        const size = this.width / 2;
        // Top left curve
        ctx.moveTo(0, size * 0.5);
        ctx.bezierCurveTo(-size, -size * 0.5, -size * 1.5, size * 0.5, 0, size * 1.5);
        // Top right curve
        ctx.bezierCurveTo(size * 1.5, size * 0.5, size, -size * 0.5, 0, size * 0.5);
        ctx.fill();
        
        // Shine/highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(-8, -5, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.shadowColor = '#E91E63';
        ctx.shadowBlur = 10;
        ctx.strokeStyle = '#F48FB1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, size * 0.5);
        ctx.bezierCurveTo(-size, -size * 0.5, -size * 1.5, size * 0.5, 0, size * 1.5);
        ctx.bezierCurveTo(size * 1.5, size * 0.5, size, -size * 0.5, 0, size * 0.5);
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        ctx.restore();
    }
    
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}

export default Heart;
