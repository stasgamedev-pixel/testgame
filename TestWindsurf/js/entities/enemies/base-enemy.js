// Base Enemy Class
// Core class for all enemy types in Funny Baxi: Run and Jump

import { COLORS } from '../../core/game-config.js';
import { updateMovement } from './enemy-movement.js';
import { render, updateAnimation, updateDeathAnimation } from './enemy-animation.js';
import { EnemyHealth } from './enemy-health.js';
import { EnemyPhysics } from './enemy-physics.js';

/**
 * Base Enemy Class
 * Common functionality for all enemy types
 */
export class BaseEnemy {
    constructor(x, y, width = 48, height = 48) {
        // Position
        this.x = x;
        this.y = y;
        this.startX = x;
        
        // Size
        this.width = width;
        this.height = height;
        
        // Movement
        this.speed = 2;
        this.direction = 1; // 1 = right, -1 = left
        this.movePattern = 'straight'; // 'straight', 'patrol', 'sine'
        this.facingDirection = 1; // 1 = right, -1 = left
        
        // Collision
        this.damageAmount = 0.5; // Damage to player
        this.canDamage = true;
        this.damageCooldown = 0;
        this.damageCooldownDuration = 1000; // 1 second
        
        // Animation
        this.animationTimer = 0;
        this.animationFrame = 0;
        this.animationSpeed = 100; // ms per frame
        
        // Color (fallback)
        this.color = COLORS.ENEMY_ORANGE;
        
        // Initialize modules
        this.healthModule = new EnemyHealth(this);
        this.physics = new EnemyPhysics(this);
        
        console.log(`👹 Base enemy created at position: ${x}, ${y}`);
    }

    /**
     * Update enemy logic
     */
    update(deltaTime) {
        if (!this.healthModule.getIsAlive()) {
            this.healthModule.updateDeath(deltaTime);
            return;
        }
        
        // Update movement (from module)
        updateMovement(this, deltaTime);
        
        // Update physics (from module)
        this.physics.update(deltaTime);
        
        // Update animation (from module)
        updateAnimation(this, deltaTime);
        
        // Update cooldowns
        this.updateCooldowns(deltaTime);
    }

    /**
     * Update cooldowns
     */
    updateCooldowns(deltaTime) {
        if (this.damageCooldown > 0) {
            this.damageCooldown -= deltaTime;
            if (this.damageCooldown <= 0) {
                this.canDamage = true;
            }
        }
    }

    /**
     * Take damage
     */
    takeDamage(amount) {
        this.healthModule.takeDamage(amount);
    }

    /**
     * Check if enemy can damage player
     */
    canDamagePlayer() {
        return this.healthModule.getIsAlive() && this.canDamage && !this.healthModule.getIsDying();
    }

    /**
     * Set damage cooldown
     */
    setDamageCooldown() {
        this.canDamage = false;
        this.damageCooldown = this.damageCooldownDuration;
    }

    /**
     * Get collision bounds
     */
    getBounds() {
        return {
            x: this.x - this.width/2,
            y: this.y - this.height,
            width: this.width,
            height: this.height
        };
    }

    /**
     * Check collision with another entity
     */
    collidesWith(other) {
        const bounds1 = this.getBounds();
        const bounds2 = other.getBounds();
        
        return bounds1.x < bounds2.x + bounds2.width &&
               bounds1.x + bounds1.width > bounds2.x &&
               bounds1.y < bounds2.y + bounds2.height &&
               bounds1.y + bounds1.height > bounds2.y;
    }

    /**
     * Render enemy (from module)
     */
    render(ctx) {
        console.log('🎮 BaseEnemy.render() called for', this.constructor.name);
        render(ctx, this);
    }

    /**
     * Set ground position
     */
    setGroundPosition(y) {
        this.physics.setGroundPosition(y);
    }

    /**
     * Destroy enemy
     */
    destroy() {
        this.healthModule.destroy();
    }

    /**
     * Reset enemy state
     */
    reset() {
        this.x = this.startX;
        this.healthModule.reset();
        this.physics.reset();
        this.canDamage = true;
        this.damageCooldown = 0;
        this.direction = 1;
        this.facingDirection = 1;
    }

    /**
     * Get health module
     */
    getHealthModule() {
        return this.healthModule;
    }

    /**
     * Get physics module
     */
    getPhysicsModule() {
        return this.physics;
    }

    /**
     * Check if enemy is alive
     */
    get isAlive() {
        return this.healthModule.getIsAlive();
    }

    /**
     * Check if enemy is dying
     */
    get isDying() {
        return this.healthModule.getIsDying();
    }

    /**
     * Get current health
     */
    get health() {
        return this.healthModule.getHealth();
    }

    /**
     * Get velocity X
     */
    get velocityX() {
        return this.physics.getVelocityX();
    }

    /**
     * Get velocity Y
     */
    get velocityY() {
        return this.physics.getVelocityY();
    }

    /**
     * Set velocity X
     */
    set velocityX(value) {
        this.physics.setVelocityX(value);
    }

    /**
     * Set velocity Y
     */
    set velocityY(value) {
        this.physics.setVelocityY(value);
    }

    /**
     * Get ground Y
     */
    get groundY() {
        return this.physics.getGroundY();
    }

    /**
     * Check if grounded
     */
    get isGrounded() {
        return this.physics.getIsGrounded();
    }

    /**
     * Get death timer
     */
    get deathTimer() {
        return this.health.deathTimer;
    }

    /**
     * Get death duration
     */
    get deathDuration() {
        return this.health.deathDuration;
    }
}
