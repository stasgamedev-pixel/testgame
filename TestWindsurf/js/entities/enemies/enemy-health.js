// Enemy Health Module
// Handles enemy health, damage, and death management

/**
 * Enemy Health Class
 * Manages enemy health state and death logic
 */
export class EnemyHealth {
    constructor(enemy) {
        this.enemy = enemy;
        this.health = 1;
        this.maxHealth = 1;
        this.isAlive = true;
        this.isDying = false;
        this.deathTimer = 0;
        this.deathDuration = 500; // 0.5 seconds
    }

    /**
     * Take damage from player
     */
    takeDamage(amount) {
        if (!this.isAlive || this.isDying) return;
        
        this.health -= amount;
        
        if (this.health <= 0) {
            this.health = 0;
            this.startDeath();
        }
    }

    /**
     * Start death sequence
     */
    startDeath() {
        this.isDying = true;
        this.isAlive = false;
        this.deathTimer = 0;
        console.log('💀 Enemy destroyed!');
    }

    /**
     * Update death animation
     */
    updateDeath(deltaTime) {
        if (!this.isDying) return;
        
        this.deathTimer += deltaTime;
        
        if (this.deathTimer >= this.deathDuration) {
            this.destroy();
        }
    }

    /**
     * Destroy enemy
     */
    destroy() {
        this.isAlive = false;
        this.isDying = false;
        console.log('🗑️ Enemy destroyed and removed');
    }

    /**
     * Reset health state
     */
    reset() {
        this.health = this.maxHealth;
        this.isAlive = true;
        this.isDying = false;
        this.deathTimer = 0;
    }

    /**
     * Check if enemy is alive
     */
    getIsAlive() {
        return this.isAlive;
    }

    /**
     * Check if enemy is dying
     */
    getIsDying() {
        return this.isDying;
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
     * Get death progress (0-1)
     */
    getDeathProgress() {
        if (!this.isDying) return 0;
        return this.deathTimer / this.deathDuration;
    }

    /**
     * Set max health
     */
    setMaxHealth(maxHealth) {
        this.maxHealth = maxHealth;
        this.health = maxHealth;
    }

    /**
     * Heal enemy
     */
    heal(amount) {
        if (!this.isAlive) return;
        
        this.health = Math.min(this.health + amount, this.maxHealth);
    }

    /**
     * Check if enemy can take damage
     */
    canTakeDamage() {
        return this.isAlive && !this.isDying;
    }
}
