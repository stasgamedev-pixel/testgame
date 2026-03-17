// Collision Handler Module
// Handles collision responses and special attacks

/**
 * Collision Handler Class
 * Manages collision responses like butt-slam attacks
 */
export class CollisionHandler {
    constructor() {
        this.collisionEvents = [];
    }

    /**
     * Handle collision between player and enemy
     */
    handleCollision(player, enemy, side, damageSystem) {
        switch (side) {
            case 'top':
                // Butt-slam attack - player jumping from above
                this.handleButtSlam(player, enemy, damageSystem);
                break;
            case 'bottom':
            case 'left':
            case 'right':
                // Side collision - damage player
                this.handleSideCollision(player, enemy, damageSystem);
                break;
        }
        
        // Add collision event
        this.collisionEvents.push({
            type: 'collision',
            player: player,
            enemy: enemy,
            side: side,
            timestamp: Date.now()
        });
    }

    /**
     * Handle butt-slam attack (player jumps on enemy from above)
     */
    handleButtSlam(player, enemy, damageSystem) {
        // Check if player is falling and above enemy
        if (player.velocityY > 0 && player.y < enemy.y) {
            // Kill enemy
            damageSystem.handleEnemyDamage(enemy, 1);
            
            // Bounce player up
            player.velocityY = -8;
            player.isGrounded = false;
            
            // Add special event
            this.collisionEvents.push({
                type: 'butt_slam',
                player: player,
                enemy: enemy,
                timestamp: Date.now()
            });
            
            console.log('🎯 Butt-slam attack! Enemy destroyed!');
        }
    }

    /**
     * Handle side collision between player and enemy
     */
    handleSideCollision(player, enemy, damageSystem) {
        // Check if enemy can damage player
        if (!damageSystem.canEnemyDamage(enemy)) return;
        
        // Apply damage to player
        damageSystem.handlePlayerDamage(player, enemy);
        
        // Apply knockback
        damageSystem.applyKnockback(player, enemy);
        
        // Set enemy damage cooldown
        enemy.setDamageCooldown();
        
        // Add side collision event
        this.collisionEvents.push({
            type: 'side_collision',
            player: player,
            enemy: enemy,
            damage: enemy.damageAmount,
            timestamp: Date.now()
        });
    }

    /**
     * Check if collision is butt-slam eligible
     */
    isButtSlamEligible(player, enemy) {
        return player.velocityY > 0 && 
               player.y < enemy.y && 
               player.isAlive && 
               enemy.isAlive;
    }

    /**
     * Check if collision is side hit
     */
    isSideHit(side) {
        return side === 'left' || side === 'right' || side === 'bottom';
    }

    /**
     * Get collision response type
     */
    getResponseType(player, enemy, side) {
        if (this.isButtSlamEligible(player, enemy) && side === 'top') {
            return 'butt_slam';
        } else if (this.isSideHit(side)) {
            return 'side_hit';
        }
        return 'unknown';
    }

    /**
     * Get all collision events
     */
    getCollisionEvents() {
        return this.collisionEvents;
    }

    /**
     * Clear collision events
     */
    clearEvents() {
        this.collisionEvents = [];
    }

    /**
     * Check if any collision events exist
     */
    hasCollisionEvents() {
        return this.collisionEvents.length > 0;
    }
}
