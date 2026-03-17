// Player Entity
// Player character for Funny Baxi: Run and Jump

import { COLORS } from '../core/game-config.js';
import { SpriteManager } from '../utils/sprite-manager.js';
import { PlayerPhysics } from './player-physics.js';
import { PlayerHealth } from './player-health.js';
import { PlayerAnimation } from './player-animation.js';

/**
 * Player Class
 * Main player character with physics, health, and animation
 */
export class Player {
    constructor(x, y) {
        // Position
        this.x = x;
        this.y = y;
        
        // Size
        this.width = 64;
        this.height = 64;
        
        // Input
        this.jumpJustPressed = false;
        
        // Sprite
        this.sprite = null;
        this.spriteManager = new SpriteManager();
        this.isSpriteLoaded = false;
        
        // Color (fallback if sprite fails to load)
        this.color = COLORS.BAXI_BLUE;
        
        // Initialize modules
        this.physics = new PlayerPhysics(this);
        this.health = new PlayerHealth(this);
        this.animation = new PlayerAnimation(this);
        
        console.log('🎮 Player created at position:', x, y);
    }

    /**
     * Initialize player sprites
     */
    async initSprites() {
        try {
            this.sprite = await this.spriteManager.loadSprite('player', 'player-placeholder.svg');
            this.isSpriteLoaded = true;
            console.log('✅ Player sprite loaded successfully!');
        } catch (error) {
            console.error('❌ Failed to load player sprite, using fallback:', error);
            this.isSpriteLoaded = false;
        }
    }

    /**
     * Update player physics and animation
     */
    update(deltaTime, inputManager) {
        // Update health (invulnerability)
        this.health.update(deltaTime);
        
        // Handle input
        this.handleInput(inputManager);
        
        // Update physics
        this.physics.update();
        
        // Update animation
        this.animation.update(deltaTime);
    }

    /**
     * Handle input from InputManager
     */
    handleInput(inputManager) {
        // Check for jump input
        if (inputManager.isActionActive('jump') && !this.jumpJustPressed && this.physics.getIsGrounded()) {
            this.jump();
            this.jumpJustPressed = true;
        }
        
        // Reset jump just pressed flag when jump key is released
        if (!inputManager.isActionActive('jump')) {
            this.jumpJustPressed = false;
        }
    }

    /**
     * Make player jump
     */
    jump() {
        this.physics.jump();
        this.animation.startJumpAnimation();
    }

    /**
     * Take damage from enemy collision
     */
    takeDamage(amount) {
        this.health.takeDamage(amount);
    }

    /**
     * Set invulnerability period after taking damage
     */
    setInvulnerability(duration) {
        this.health.setInvulnerability(duration);
    }

    /**
     * Get collision bounds for collision detection
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
     * Render player
     */
    render(ctx) {
        ctx.save();
        
        // Apply invulnerability blinking effect
        this.animation.applyInvulnerabilityEffect(ctx);
        
        // Apply animation transformation
        if (this.animation.getIsJumping()) {
            this.animation.applyJumpAnimation(ctx);
        }
        
        // Render sprite or fallback rectangle
        if (this.isSpriteLoaded && this.sprite) {
            // Render sprite
            ctx.drawImage(
                this.sprite, 
                this.x - this.width/2, 
                this.y - this.height, 
                this.width, 
                this.height
            );
        } else {
            // Fallback: render colored rectangle with face
            this.animation.renderFallback(ctx);
        }
        
        ctx.restore();
    }

    /**
     * Set ground position
     */
    setGroundPosition(y) {
        this.physics.setGroundPosition(y);
    }

    /**
     * Get animation module
     */
    getAnimationModule() {
        return this.animation;
    }

    /**
     * Check if player is alive
     */
    get isAlive() {
        return this.health.getIsAlive();
    }

    /**
     * Get health module
     */
    getHealthModule() {
        return this.health;
    }

    /**
     * Get player position
     */
    getPosition() {
        return { x: this.x, y: this.y };
    }

    /**
     * Set player position
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.groundY = y;
    }

    /**
     * Reset player state
     */
    reset() {
        this.physics.reset();
        this.health.reset();
        this.animation.reset();
        this.jumpJustPressed = false;
    }
}
