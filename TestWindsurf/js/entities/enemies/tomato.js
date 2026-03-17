// Tomato Enemy
// Unique enemy type with rolling movement pattern

import { BaseEnemy } from './base-enemy.js';
import { COLORS } from '../../core/game-config.js';

/**
 * Tomato Enemy Class
 * Enemy that rolls and bounces off walls
 */
export class Tomato extends BaseEnemy {
    constructor(x, y) {
        super(x, y);
        
        // Tomato-specific properties
        this.speed = 4; // Fast rolling speed
        this.color = COLORS.TOMATO_RED || '#FF6B35';
        this.damageAmount = 0.4; // Medium damage
        
        // Rolling pattern
        this.rollAngle = 0;
        this.rollSpeed = 0.1; // Rotation speed
        this.bounceForce = 8;
        
        // Movement pattern
        this.movePattern = 'tomato-roll';
        
        console.log(`🍅 Tomato enemy created at position: ${x}, ${y}`);
    }

    /**
     * Update tomato-specific logic
     */
    update(deltaTime) {
        if (!this.isAlive) {
            super.update(deltaTime);
            return;
        }
        
        // Unique movement pattern
        this.updateTomatoMovement(deltaTime);
        
        // Update base animation
        super.update(deltaTime);
        
        // Update rolling animation
        this.updateRollAnimation(deltaTime);
    }

    /**
     * Tomato-specific rolling movement
     */
    updateTomatoMovement(deltaTime) {
        // Move horizontally with rolling
        this.velocityX = this.speed * this.direction;
        this.x += this.velocityX;
        
        // Check wall boundaries and bounce
        this.checkWallBounce();
        
        // Apply physics
        this.updatePhysics(deltaTime);
    }

    /**
     * Check wall boundaries and bounce
     */
    checkWallBounce() {
        const canvasWidth = 1280; // Game canvas width
        const margin = this.width / 2;
        
        // Bounce off left wall
        if (this.x - margin <= 0) {
            this.x = margin;
            this.direction = 1;
            this.facingDirection = 1;
            if (this.physics.getIsGrounded()) {
                this.bounce();
            }
        }
        
        // Bounce off right wall
        if (this.x + margin >= canvasWidth) {
            this.x = canvasWidth - margin;
            this.direction = -1;
            this.facingDirection = -1;
            if (this.physics.getIsGrounded()) {
                this.bounce();
            }
        }
    }

    /**
     * Bounce effect
     */
    bounce() {
        this.velocityY = -this.bounceForce;
        this.physics.setIsGrounded(false);
        console.log('🍅 Tomato bounces!');
    }

    /**
     * Update rolling animation
     */
    updateRollAnimation(deltaTime) {
        // Roll based on movement
        const rollDistance = Math.abs(this.velocityX) * deltaTime * 0.01;
        this.rollAngle += rollDistance * this.direction;
        
        // Keep angle in reasonable range
        if (this.rollAngle > Math.PI * 2) {
            this.rollAngle -= Math.PI * 2;
        } else if (this.rollAngle < -Math.PI * 2) {
            this.rollAngle += Math.PI * 2;
        }
    }

    /**
     * Render tomato-specific face
     */
    renderFace(ctx) {
        ctx.fillStyle = '#FFFFFF';
        
        // Tomato eyes (round, angry)
        const eyeY = this.y - this.height + 15;
        ctx.beginPath();
        ctx.arc(this.x - 8, eyeY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + 8, eyeY, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Angry tomato mouth (wavy)
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x - 10, this.y - this.height + 30);
        ctx.quadraticCurveTo(this.x, this.y - this.height + 35, this.x + 10, this.y - this.height + 30);
        ctx.stroke();
        
        // Tomato stem (green top)
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(this.x - 3, this.y - this.height - 3, 6, 3);
    }

    /**
     * Override render for tomato-specific visuals with rolling
     */
    render(ctx) {
        console.log('🎮 Tomato.render() called');
        super.render(ctx);
    }

    /**
     * Apply death animation (from base class)
     */
    applyDeathAnimation(ctx) {
        const progress = this.deathTimer / this.deathDuration;
        
        // Fade out
        ctx.globalAlpha = 1 - progress;
        
        // Scale down
        const scale = 1 - progress * 0.5;
        ctx.translate(this.x, this.y - this.height/2);
        ctx.scale(scale, scale);
        ctx.translate(-this.x, -(this.y - this.height/2));
    }

    /**
     * Update physics (override for bounce logic)
     */
    updatePhysics(deltaTime) {
        // Apply gravity
        if (!this.isGrounded) {
            this.velocityY += this.gravity;
        }
        
        // Update position
        this.y += this.velocityY;
        
        // Check ground collision
        if (this.y >= this.groundY) {
            this.y = this.groundY;
            this.velocityY = 0;
            this.isGrounded = true;
        }
    }

    /**
     * Reset tomato state
     */
    reset() {
        super.reset();
        this.rollAngle = 0;
    }
}
