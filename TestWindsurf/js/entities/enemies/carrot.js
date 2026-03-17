// Carrot Enemy
// Unique enemy type with jump movement pattern

import { BaseEnemy } from './base-enemy.js';
import { COLORS } from '../../core/game-config.js';
import { renderFace as baseRenderFace } from './enemy-animation.js';

/**
 * Carrot Enemy Class
 * Enemy that jumps and moves in unique pattern
 */
export class Carrot extends BaseEnemy {
    constructor(x, y) {
        super(x, y);
        
        // Carrot-specific properties
        this.speed = 3; // Faster than base
        this.color = COLORS.CARROT_ORANGE || '#FF8C00';
        this.damageAmount = 0.3; // Less damage
        
        // Jump pattern
        this.jumpCooldown = 0;
        this.jumpCooldownDuration = 2000; // 2 seconds
        this.jumpPower = -12;
        this.isJumping = false;
        
        // Movement pattern
        this.movePattern = 'carrot-jump';
        
        console.log(`🥕 Carrot enemy created at position: ${x}, ${y}`);
    }

    /**
     * Update carrot-specific logic
     */
    update(deltaTime) {
        if (!this.isAlive) {
            super.update(deltaTime);
            return;
        }
        
        // Update jump cooldown
        this.updateJumpCooldown(deltaTime);
        
        // Unique movement pattern
        this.updateCarrotMovement(deltaTime);
        
        // Update base animation
        super.update(deltaTime);
    }

    /**
     * Update jump cooldown
     */
    updateJumpCooldown(deltaTime) {
        if (this.jumpCooldown > 0) {
            this.jumpCooldown -= deltaTime;
        }
    }

    /**
     * Carrot-specific movement pattern
     */
    updateCarrotMovement(deltaTime) {
        // Move horizontally
        this.velocityX = this.speed * this.direction;
        this.x += this.velocityX;
        
        // Jump periodically
        if (this.jumpCooldown <= 0 && this.isGrounded) {
            this.jump();
        }
        
        // Apply physics
        this.updatePhysics(deltaTime);
    }

    /**
     * Make carrot jump
     */
    jump() {
        if (this.isGrounded) {
            this.velocityY = this.jumpPower;
            this.isGrounded = false;
            this.isJumping = true;
            this.jumpCooldown = this.jumpCooldownDuration;
            console.log('🥕 Carrot jumps!');
        }
    }

    /**
     * Update physics (override for jump logic)
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
            this.isJumping = false;
        }
    }

    /**
     * Render carrot-specific face
     */
    renderFace(ctx) {
        ctx.fillStyle = '#FFFFFF';
        
        // Carrot eyes (smaller, closer together)
        const eyeY = this.y - this.height + 12;
        ctx.fillRect(this.x - 8, eyeY, 5, 5);
        ctx.fillRect(this.x + 3, eyeY, 5, 5);
        
        // Carrot mouth (small line)
        ctx.fillRect(this.x - 6, this.y - this.height + 25, 12, 2);
        
        // Carrot green top (leaves)
        ctx.fillStyle = '#4CAF50';
        const leafY = this.y - this.height - 5;
        ctx.fillRect(this.x - 10, leafY, 20, 5);
        ctx.fillRect(this.x - 5, leafY - 3, 10, 3);
    }

    /**
     * Override render for carrot-specific visuals
     */
    render(ctx) {
        console.log('🎮 Carrot.render() called');
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
     * Reset carrot state
     */
    reset() {
        super.reset();
        this.jumpCooldown = 0;
        this.isJumping = false;
    }
}
