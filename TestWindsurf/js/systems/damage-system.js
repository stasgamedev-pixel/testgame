// Damage System Module
// Handles player damage, invulnerability, and health management

/**
 * Damage System Class
 * Manages damage calculations and health changes
 */
export class DamageSystem {
    constructor() {
        this.damageEvents = [];
    }

    /**
     * Handle player taking damage from enemy
     */
    handlePlayerDamage(player, enemy) {
        // Check if player is vulnerable
        if (player.isInvulnerable) return;
        
        // Apply damage (0.5 hearts as per GDD)
        const damageAmount = enemy.damageAmount || 0.5;
        player.takeDamage(damageAmount);
        
        // Set invulnerability period (1 second as per GDD)
        player.setInvulnerability(1000);
        
        // Record damage event
        this.damageEvents.push({
            type: 'player_damage',
            player: player,
            enemy: enemy,
            damage: damageAmount,
            timestamp: Date.now()
        });
        
        console.log('💔 Player damaged! Health:', player.health);
    }

    /**
     * Handle enemy taking damage
     */
    handleEnemyDamage(enemy, damage) {
        if (!enemy.isAlive) return;
        
        enemy.takeDamage(damage);
        
        // Record damage event
        this.damageEvents.push({
            type: 'enemy_damage',
            enemy: enemy,
            damage: damage,
            timestamp: Date.now()
        });
        
        console.log('👹 Enemy damaged! Health:', enemy.health);
    }

    /**
     * Check if player can take damage
     */
    canDamagePlayer(player) {
        return player.isAlive && !player.isInvulnerable;
    }

    /**
     * Check if enemy can deal damage
     */
    canEnemyDamage(enemy) {
        return enemy.isAlive && enemy.canDamage;
    }

    /**
     * Calculate knockback force
     */
    calculateKnockback(player, enemy) {
        // Calculate knockback direction (away from enemy)
        const knockbackDirection = player.x < enemy.x ? -1 : 1;
        const knockbackForce = 5;
        
        return {
            direction: knockbackDirection,
            force: knockbackForce,
            verticalForce: -3
        };
    }

    /**
     * Apply knockback to player
     */
    applyKnockback(player, enemy) {
        const knockback = this.calculateKnockback(player, enemy);
        
        // Apply horizontal knockback
        player.x += knockback.direction * knockback.force;
        
        // Small vertical knockback
        player.velocityY = knockback.verticalForce;
        player.isGrounded = false;
        
        // Record knockback event
        this.damageEvents.push({
            type: 'player_knockback',
            player: player,
            enemy: enemy,
            knockback: knockback,
            timestamp: Date.now()
        });
    }

    /**
     * Get all damage events
     */
    getDamageEvents() {
        return this.damageEvents;
    }

    /**
     * Clear damage events
     */
    clearEvents() {
        this.damageEvents = [];
    }

    /**
     * Check if any damage events exist
     */
    hasDamageEvents() {
        return this.damageEvents.length > 0;
    }
}
