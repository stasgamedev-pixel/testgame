// Collision System Orchestrator
// Main collision system that coordinates detection, damage, and handling

import { CollisionDetection } from './collision-detection.js';
import { DamageSystem } from './damage-system.js';
import { CollisionHandler } from './collision-handler.js';

/**
 * Collision Types
 * Defines different types of collisions in the game
 */
export const COLLISION_TYPES = {
    PLAYER_SIDE_HIT: 'player_side_hit',     // 0.5 damage to player
    PLAYER_BOTTOM_HIT: 'player_bottom_hit', // 0.5 damage to player
    PLAYER_BUTT_SLAM: 'player_butt_slam',   // Kill enemy
    ENEMY_DAMAGE_PLAYER: 'enemy_damage_player'
};

/**
 * Collision System Class
 * Orchestrates all collision detection and response in the game
 */
export class CollisionSystem {
    constructor() {
        this.detector = new CollisionDetection();
        this.damageSystem = new DamageSystem();
        this.handler = new CollisionHandler();
    }

    /**
     * Check all collisions between entities
     */
    checkCollisions(player, enemies) {
        // Clear previous events
        this.clearEvents();
        
        // Get collision pairs
        const collisionPairs = this.detector.checkCollisions(player, enemies);
        
        // Handle each collision
        for (const pair of collisionPairs) {
            this.handler.handleCollision(
                pair.player, 
                pair.enemy, 
                pair.side, 
                this.damageSystem
            );
        }
        
        return this.getAllEvents();
    }

    /**
     * Check if player collides with enemy
     */
    checkPlayerEnemyCollision(player, enemy) {
        return this.detector.checkPlayerEnemyCollision(player, enemy);
    }

    /**
     * Get collision side between player and enemy
     */
    getCollisionSide(player, enemy) {
        return this.detector.getCollisionSide(player, enemy);
    }

    /**
     * Handle butt-slam attack
     */
    handleButtSlam(player, enemy) {
        this.handler.handleButtSlam(player, enemy, this.damageSystem);
    }

    /**
     * Handle player damage
     */
    handlePlayerDamage(player, enemy) {
        this.handler.handleSideCollision(player, enemy, this.damageSystem);
    }

    /**
     * Check if point collides with any enemy
     */
    checkPointEnemyCollision(point, enemies) {
        return this.detector.checkPointEnemyCollision(point, enemies);
    }

    /**
     * Get all events from all systems
     */
    getAllEvents() {
        return {
            collisionPairs: this.detector.getCollisionPairs(),
            damageEvents: this.damageSystem.getDamageEvents(),
            collisionEvents: this.handler.getCollisionEvents()
        };
    }

    /**
     * Clear all events from all systems
     */
    clearEvents() {
        this.detector.clearPairs();
        this.damageSystem.clearEvents();
        this.handler.clearEvents();
    }

    /**
     * Check if any collision events exist
     */
    hasCollisionEvents() {
        return this.detector.hasCollisions() || 
               this.damageSystem.hasDamageEvents() || 
               this.handler.hasCollisionEvents();
    }

    /**
     * Get collision events count
     */
    getEventCount() {
        const events = this.getAllEvents();
        return events.collisionPairs.length + 
               events.damageEvents.length + 
               events.collisionEvents.length;
    }
}

/**
 * Create singleton collision system instance
 */
export const collisionSystem = new CollisionSystem();
