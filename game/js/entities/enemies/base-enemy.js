/**
 * Base Enemy Class
 */

import CONSTANTS from '../core/constants.js';

export class BaseEnemy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = CONSTANTS.ENEMY_WIDTH;
        this.height = CONSTANTS.ENEMY_HEIGHT;
        this.type = type;
        this.isDead = false;
        this.animFrame = 0;
        this.animTimer = 0;
    }
    
    update(deltaTime, gameSpeed) {
        // Move left with game speed
        this.x -= CONSTANTS.PLAYER_SPEED * gameSpeed * deltaTime;
        
        // Animation
        this.animTimer += deltaTime;
        if (this.animTimer > 0.1) {
            this.animTimer = 0;
            this.animFrame = (this.animFrame + 1) % 4;
        }
        
        // Remove if off screen
        if (this.x + this.width < 0) {
            return true; // Should be removed
        }
        return false;
    }
    
    draw(ctx) {
        // Override in subclasses
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

export default BaseEnemy;
