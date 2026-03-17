/**
 * Coin Item
 */

import CONSTANTS from '../core/constants.js';

export class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = CONSTANTS.COIN_WIDTH;
        this.height = CONSTANTS.COIN_HEIGHT;
        this.collected = false;
        this.animFrame = 0;
        this.animTimer = 0;
        this.rotation = 0;
    }
    
    update(deltaTime, gameSpeed) {
        // Move left with game speed
        this.x -= CONSTANTS.PLAYER_SPEED * gameSpeed * deltaTime;
        
        // Spinning animation
        this.rotation += 5 * deltaTime;
        
        // Bobbing up and down
        this.animTimer += deltaTime;
        this.y += Math.sin(this.animTimer * 5) * 0.5;
        
        // Remove if off screen
        return this.x + this.width < 0;
    }
    
    draw(ctx) {
        if (this.collected) return;
        
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        
        // Scale based on rotation (simulate 3D spin)
        const scaleX = Math.abs(Math.cos(this.rotation));
        ctx.scale(scaleX, 1);
        
        // Coin body (purple/pink gradient)
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.width / 2);
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(1, '#D65DB1');
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Shine
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(-8, -8, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Dollar sign or star
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(0, 10);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.stroke();
        
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

export default Coin;
