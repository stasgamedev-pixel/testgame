// Enemy Physics Module
// Handles enemy physics, gravity, and ground collision

/**
 * Enemy Physics Class
 * Manages enemy physics calculations
 */
export class EnemyPhysics {
    constructor(enemy) {
        this.enemy = enemy;
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = 0.5;
        this.isGrounded = false;
        this.groundY = enemy.y;
    }

    /**
     * Update physics calculations
     */
    update(deltaTime) {
        // Apply gravity
        if (!this.isGrounded) {
            this.velocityY += this.gravity;
        }
        
        // Update position
        this.enemy.y += this.velocityY;
        
        // Check ground collision
        this.checkGroundCollision();
    }

    /**
     * Check ground collision
     */
    checkGroundCollision() {
        if (this.enemy.y >= this.groundY) {
            this.enemy.y = this.groundY;
            this.velocityY = 0;
            this.isGrounded = true;
        }
    }

    /**
     * Set ground position
     */
    setGroundPosition(y) {
        this.groundY = y;
        this.enemy.y = y;
        this.isGrounded = true;
        this.velocityY = 0;
    }

    /**
     * Apply force to enemy
     */
    applyForce(forceX, forceY) {
        this.velocityX += forceX;
        this.velocityY += forceY;
    }

    /**
     * Set horizontal velocity
     */
    setVelocityX(velocityX) {
        this.velocityX = velocityX;
    }

    /**
     * Set vertical velocity
     */
    setVelocityY(velocityY) {
        this.velocityY = velocityY;
    }

    /**
     * Get horizontal velocity
     */
    getVelocityX() {
        return this.velocityX;
    }

    /**
     * Get vertical velocity
     */
    getVelocityY() {
        return this.velocityY;
    }

    /**
     * Check if enemy is grounded
     */
    getIsGrounded() {
        return this.isGrounded;
    }

    /**
     * Set grounded state
     */
    setIsGrounded(isGrounded) {
        this.isGrounded = isGrounded;
    }

    /**
     * Make enemy jump
     */
    jump(jumpPower = -10) {
        if (this.isGrounded) {
            this.velocityY = jumpPower;
            this.isGrounded = false;
        }
    }

    /**
     * Reset physics state
     */
    reset() {
        this.velocityX = 0;
        this.velocityY = 0;
        this.isGrounded = true;
        this.enemy.y = this.groundY;
    }

    /**
     * Set gravity strength
     */
    setGravity(gravity) {
        this.gravity = gravity;
    }

    /**
     * Get gravity strength
     */
    getGravity() {
        return this.gravity;
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
        this.velocityX = direction * force;
        this.velocityY = -3;
        this.isGrounded = false;
    }
}
