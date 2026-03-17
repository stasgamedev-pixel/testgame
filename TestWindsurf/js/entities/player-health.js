// Player Health Module
// Handles player health, damage, and invulnerability

/**
 * Player Health Class
 * Manages player health state and damage handling
 */
export class PlayerHealth {
    constructor(player) {
        this.player = player;
        this.health = 3; // 3 Hearts (GDD Section 2.2)
        this.maxHealth = 3;
        this.isAlive = true;
        this.isInvulnerable = false;
        this.invulnerabilityTimer = 0;
        this.invulnerabilityDuration = 1000; // 1 second (GDD)
    }

    /**
     * Update invulnerability timer
     */
    update(deltaTime) {
        if (this.isInvulnerable) {
            this.invulnerabilityTimer -= deltaTime;
            if (this.invulnerabilityTimer <= 0) {
                this.isInvulnerable = false;
                this.invulnerabilityTimer = 0;
            }
        }
    }

    /**
     * Take damage from enemy collision
     */
    takeDamage(amount) {
        if (!this.isAlive || this.isInvulnerable) return;
        
        this.health -= amount;
        
        if (this.health <= 0) {
            this.health = 0;
            this.isAlive = false;
            console.log('💀 Player died!');
        } else {
            console.log('💔 Player damaged! Health:', this.health, '/', this.maxHealth);
        }
    }

    /**
     * Set invulnerability period after taking damage
     */
    setInvulnerability(duration) {
        this.isInvulnerable = true;
        this.invulnerabilityTimer = duration || this.invulnerabilityDuration;
    }

    /**
     * Heal player
     */
    heal(amount) {
        if (!this.isAlive) return;
        
        this.health = Math.min(this.health + amount, this.maxHealth);
        console.log('❤️ Player healed! Health:', this.health, '/', this.maxHealth);
    }

    /**
     * Restore full health
     */
    restoreFullHealth() {
        this.health = this.maxHealth;
        this.isAlive = true;
        console.log('💖 Player health fully restored!');
    }

    /**
     * Check if player can take damage
     */
    canTakeDamage() {
        return this.isAlive && !this.isInvulnerable;
    }

    /**
     * Get current health
     */
    getHealth() {
        return this.health;
    }

    /**
     * Get max health
     */
    getMaxHealth() {
        return this.maxHealth;
    }

    /**
     * Get health percentage (0-1)
     */
    getHealthPercentage() {
        return this.health / this.maxHealth;
    }

    /**
     * Check if player is alive
     */
    getIsAlive() {
        return this.isAlive;
    }

    /**
     * Check if player is invulnerable
     */
    getIsInvulnerable() {
        return this.isInvulnerable;
    }

    /**
     * Get invulnerability timer
     */
    getInvulnerabilityTimer() {
        return this.invulnerabilityTimer;
    }

    /**
     * Get invulnerability duration
     */
    getInvulnerabilityDuration() {
        return this.invulnerabilityDuration;
    }

    /**
     * Set max health
     */
    setMaxHealth(maxHealth) {
        this.maxHealth = maxHealth;
        this.health = Math.min(this.health, maxHealth);
    }

    /**
     * Set health directly
     */
    setHealth(health) {
        this.health = Math.max(0, Math.min(health, this.maxHealth));
        this.isAlive = this.health > 0;
    }

    /**
     * Reset health state
     */
    reset() {
        this.health = this.maxHealth;
        this.isAlive = true;
        this.isInvulnerable = false;
        this.invulnerabilityTimer = 0;
    }

    /**
     * Get hearts count for display
     */
    getHeartsCount() {
        return Math.ceil(this.health * 2); // Convert to half-hearts
    }

    /**
     * Check if player has low health
     */
    hasLowHealth() {
        return this.health <= 1; // 1 heart or less
    }

    /**
     * Get damage flash alpha for rendering
     */
    getDamageFlashAlpha() {
        if (!this.isInvulnerable) return 1;
        return 0.5 + Math.sin(Date.now() * 0.01) * 0.3;
    }
}
