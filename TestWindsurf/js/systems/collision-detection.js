// Collision Detection Module
// Core AABB collision detection functionality

import { CollisionUtils } from '../utils/collision-utils.js';

/**
 * Collision Detection Class
 * Handles pure collision detection without game logic
 */
export class CollisionDetection {
    constructor() {
        this.collisionPairs = [];
    }

    /**
     * Check if player collides with enemy
     */
    checkPlayerEnemyCollision(player, enemy) {
        if (!enemy.isAlive || !player.isAlive) return false;
        
        const playerBounds = player.getBounds();
        const enemyBounds = enemy.getBounds();
        
        return CollisionUtils.AABB(playerBounds, enemyBounds);
    }

    /**
     * Get collision side between player and enemy
     */
    getCollisionSide(player, enemy) {
        const playerBounds = player.getBounds();
        const enemyBounds = enemy.getBounds();
        
        return CollisionUtils.getCollisionSide(playerBounds, enemyBounds);
    }

    /**
     * Check all collisions between player and enemies
     */
    checkCollisions(player, enemies) {
        this.collisionPairs = [];
        
        for (const enemy of enemies) {
            if (this.checkPlayerEnemyCollision(player, enemy)) {
                const side = this.getCollisionSide(player, enemy);
                this.collisionPairs.push({
                    player: player,
                    enemy: enemy,
                    side: side
                });
            }
        }
        
        return this.collisionPairs;
    }

    /**
     * Check if point collides with any enemy
     */
    checkPointEnemyCollision(point, enemies) {
        for (const enemy of enemies) {
            if (enemy.isAlive && CollisionUtils.pointInRect(point, enemy.getBounds())) {
                return enemy;
            }
        }
        return null;
    }

    /**
     * Get collision pairs from last check
     */
    getCollisionPairs() {
        return this.collisionPairs;
    }

    /**
     * Clear collision pairs
     */
    clearPairs() {
        this.collisionPairs = [];
    }

    /**
     * Check if any collisions exist
     */
    hasCollisions() {
        return this.collisionPairs.length > 0;
    }
}
