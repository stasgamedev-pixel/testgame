/**
 * Player Entity - Baxi Character
 */

import CONSTANTS from '../core/constants.js';
import { checkCollision } from '../core/utils.js';

export class Player {
    constructor(canvasWidth, canvasHeight) {
        this.width = CONSTANTS.PLAYER_WIDTH;
        this.height = CONSTANTS.PLAYER_HEIGHT;
        this.x = 200;
        this.y = CONSTANTS.GROUND_Y - this.height;
        this.vy = 0;
        this.isJumping = false;
        this.isAttacking = false;
        this.hp = CONSTANTS.MAX_HP;
        this.invincible = false;
        this.invincibleTimer = 0;
        this.skinColor = '#4A9FFF';
        this.animFrame = 0;
        this.animTimer = 0;
        this.facingRight = true;
        
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }
    
    jump() {
        if (!this.isJumping) {
            this.vy = CONSTANTS.JUMP_FORCE;
            this.isJumping = true;
            this.isAttacking = false;
            return true;
        }
        return false;
    }
    
    attack() {
        if (this.isJumping && !this.isAttacking) {
            this.isAttacking = true;
            this.vy = CONSTANTS.JUMP_FORCE * 0.3; // Fast fall
            return true;
        }
        return false;
    }
    
    update(deltaTime) {
        // Apply gravity
        this.vy += CONSTANTS.GRAVITY * deltaTime;
        this.y += this.vy * deltaTime;
        
        // Ground collision
        const groundY = CONSTANTS.GROUND_Y - this.height;
        if (this.y >= groundY) {
            this.y = groundY;
            this.vy = 0;
            this.isJumping = false;
            this.isAttacking = false;
        }
        
        // Update invincibility
        if (this.invincible) {
            this.invincibleTimer -= deltaTime * 1000;
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
            }
        }
        
        // Animation timer
        this.animTimer += deltaTime;
        if (this.animTimer > 0.1) {
            this.animTimer = 0;
            this.animFrame = (this.animFrame + 1) % 6;
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        
        // Flicker when invincible
        if (this.invincible && Math.floor(Date.now() / 100) % 2 === 0) {
            ctx.globalAlpha = 0.5;
        }
        
        // Draw Baxi (cute chibi monster)
        const size = this.width / 2;
        
        // Body (fluffy round shape)
        ctx.fillStyle = this.skinColor;
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Belly (lighter color)
        ctx.fillStyle = this.lightenColor(this.skinColor, 20);
        ctx.beginPath();
        ctx.arc(0, size * 0.3, size * 0.6, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyes
        const eyeOffset = this.facingRight ? 5 : -5;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(eyeOffset - 8, -size * 0.3, size * 0.35, 0, Math.PI * 2);
        ctx.arc(eyeOffset + 8, -size * 0.3, size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupils
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(eyeOffset - 6, -size * 0.3, size * 0.15, 0, Math.PI * 2);
        ctx.arc(eyeOffset + 10, -size * 0.3, size * 0.15, 0, Math.PI * 2);
        ctx.fill();
        
        // Mouth (smiling)
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(eyeOffset, size * 0.2, size * 0.3, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();
        
        // Teeth (funny zigzag)
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(eyeOffset - 5, size * 0.35);
        ctx.lineTo(eyeOffset, size * 0.5);
        ctx.lineTo(eyeOffset + 5, size * 0.35);
        ctx.fill();
        
        // Ears/Horns (small cute ones)
        ctx.fillStyle = this.skinColor;
        ctx.beginPath();
        ctx.moveTo(-size * 0.8, -size * 0.5);
        ctx.lineTo(-size * 0.6, -size * 1.2);
        ctx.lineTo(-size * 0.4, -size * 0.5);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(size * 0.8, -size * 0.5);
        ctx.lineTo(size * 0.6, -size * 1.2);
        ctx.lineTo(size * 0.4, -size * 0.5);
        ctx.fill();
        
        // Legs (animated when running)
        ctx.fillStyle = this.darkenColor(this.skinColor, 10);
        const legOffset = this.isJumping ? 0 : Math.sin(this.animFrame * Math.PI / 3) * 5;
        ctx.beginPath();
        ctx.arc(-size * 0.4, size * 0.9 + legOffset, size * 0.25, 0, Math.PI * 2);
        ctx.arc(size * 0.4, size * 0.9 - legOffset, size * 0.25, 0, Math.PI * 2);
        ctx.fill();
        
        // Big butt (when attacking)
        if (this.isAttacking) {
            ctx.fillStyle = this.darkenColor(this.skinColor, 15);
            ctx.beginPath();
            ctx.arc(-size * 0.5, size * 0.5, size * 0.4, 0, Math.PI * 2);
            ctx.arc(size * 0.5, size * 0.5, size * 0.4, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
    
    takeDamage(amount) {
        if (!this.invincible) {
            this.hp -= amount;
            this.invincible = true;
            this.invincibleTimer = CONSTANTS.INVINCIBILITY_TIME;
            return true;
        }
        return false;
    }
    
    heal(amount) {
        this.hp = Math.min(CONSTANTS.MAX_HP, this.hp + amount);
    }
    
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
    
    setSkin(color) {
        this.skinColor = color;
    }
    
    lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }
    
    darkenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, (num >> 16) - amt);
        const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
        const B = Math.max(0, (num & 0x0000FF) - amt);
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }
}

export default Player;
