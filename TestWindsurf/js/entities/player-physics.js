// Player Physics Module
// Handles player physics, jumping, and ground collision

/**
 * Player Physics Class
 * Manages player movement and physics calculations
 */
export class PlayerPhysics {
    constructor(player) {
        this.player = player;
        this.velocityY = 0;
        this.gravity = 0.8;
        this.jumpPower = -15;
        this.groundY = player.y;
        this.isGrounded = true;
    }

    /**
     * Update physics calculations
     */
    update() {
        // Apply gravity
        if (!this.isGrounded) {
            this.velocityY += this.gravity;
        }
        
        // Update position
        this.player.y += this.velocityY;
        
        // Check ground collision
        this.checkGroundCollision();
    }

    /**
     * Check ground collision
     */
    checkGroundCollision() {
        if (this.player.y >= this.groundY) {
            this.player.y = this.groundY;
            this.velocityY = 0;
            this.isGrounded = true;
        }
    }

    /**
     * Make player jump
     */
    jump() {
        if (this.isGrounded) {
            this.velocityY = this.jumpPower;
            this.isGrounded = false;
            this.player.isJumping = true;
            this.player.jumpAnimationTimer = 0;
            console.log('🦘 Player jump!');
        }
    }

    /**
     * Set ground position
     */
    setGroundPosition(y) {
        this.groundY = y;
        this.player.y = y;
        this.isGrounded = true;
        this.velocityY = 0;
    }

    /**
     * Apply force to player
     */
    applyForce(forceX, forceY) {
        this.velocityY += forceY;
        // Horizontal force would be applied to player.x directly
    }

    /**
     * Set vertical velocity
     */
    setVelocityY(velocityY) {
        this.velocityY = velocityY;
    }

    /**
     * Get vertical velocity
     */
    getVelocityY() {
        return this.velocityY;
    }

    /**
     * Check if player is grounded
     */
    getIsGrounded() {
        return this.isGrounded;
    }

    /**
     * Reset physics state
     */
    reset() {
        this.velocityY = 0;
        this.isGrounded = true;
        this.player.y = this.groundY;
    }

    /**
     * Set gravity strength
     */
    setGravity(gravity) {
        this.gravity = gravity;
    }

    /**
     * Set jump power
     */
    setJumpPower(jumpPower) {
        this.jumpPower = jumpPower;
    }

    /**
     * Get gravity strength
     */
    getGravity() {
        return this.gravity;
    }

    /**
     * Get jump power
     */
    getJumpPower() {
        return this.jumpPower;
    }

    /**
     * Get ground Y position
     */
    getGroundY() {
        return this.groundY;
    }

    /**
     * Apply bounce effect
     */
    bounce(bounceForce = -8) {
        this.velocityY = bounceForce;
        this.isGrounded = false;
    }

    /**
     * Apply knockback
     */
    applyKnockback(direction, force = 5) {
        this.player.x += direction * force;
        this.velocityY = -3;
        this.isGrounded = false;
    }

    /**
     * Check if player can jump
     */
    canJump() {
        return this.isGrounded;
    }

    /**
     * Force jump (even if not grounded)
     */
    forceJump() {
        this.velocityY = this.jumpPower;
        this.isGrounded = false;
        this.player.isJumping = true;
        this.player.jumpAnimationTimer = 0;
    }
}
