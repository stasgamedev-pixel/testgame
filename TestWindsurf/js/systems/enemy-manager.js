// Enemy Manager Module
// Handles enemy spawning, updating, and management

import { Carrot } from '../entities/enemies/carrot.js';
import { Tomato } from '../entities/enemies/tomato.js';

/**
 * Enemy Manager Class
 * Manages all enemy entities in the game
 */
export class EnemyManager {
    constructor() {
        this.enemies = [];
        this.spawnTimer = 0;
        this.spawnInterval = 3000; // 3 seconds
        this.maxEnemies = 10;
        this.enemyTypes = ['carrot', 'tomato'];
    }

    /**
     * Update all enemies
     */
    update(deltaTime, gameState) {
        // Don't update enemies if game is over
        if (gameState === 'GAME_OVER') return;
        
        // Update spawn timer
        this.updateSpawnTimer(deltaTime);
        
        // Update existing enemies
        this.updateEnemies(deltaTime);
        
        // Remove dead enemies
        this.removeDeadEnemies();
    }

    /**
     * Update spawn timer
     */
    updateSpawnTimer(deltaTime) {
        this.spawnTimer += deltaTime;
        
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnEnemy();
            this.spawnTimer = 0;
        }
    }

    /**
     * Update existing enemies
     */
    updateEnemies(deltaTime) {
        for (const enemy of this.enemies) {
            enemy.update(deltaTime);
        }
    }

    /**
     * Remove dead enemies
     */
    removeDeadEnemies() {
        this.enemies = this.enemies.filter(enemy => enemy.isAlive);
    }

    /**
     * Spawn new enemy
     */
    spawnEnemy() {
        if (this.enemies.length >= this.maxEnemies) return;
        
        const enemyType = this.getRandomEnemyType();
        const spawnPosition = this.getRandomSpawnPosition();
        const enemy = this.createEnemy(enemyType, spawnPosition.x, spawnPosition.y);
        
        if (enemy) {
            this.enemies.push(enemy);
            console.log(`👹 Spawned ${enemyType} enemy at position: ${spawnPosition.x}, ${spawnPosition.y}`);
        }
    }

    /**
     * Get random enemy type
     */
    getRandomEnemyType() {
        const index = Math.floor(Math.random() * this.enemyTypes.length);
        return this.enemyTypes[index];
    }

    /**
     * Get random spawn position
     */
    getRandomSpawnPosition() {
        const canvasWidth = 1280;
        
        // Spawn from right side of screen (without margin)
        const x = canvasWidth - 50; // Spawn at edge
        const y = 500; // Ground level
        
        return { x, y };
    }

    /**
     * Create enemy instance
     */
    createEnemy(type, x, y) {
        switch (type) {
            case 'carrot':
                return new Carrot(x, y);
            case 'tomato':
                return new Tomato(x, y);
            default:
                console.warn(`Unknown enemy type: ${type}`);
                return null;
        }
    }

    /**
     * Create test enemies for development
     */
    createTestEnemies() {
        // Create carrot enemy
        const carrot = new Carrot(600, 500);
        this.enemies.push(carrot);
        
        // Create tomato enemy
        const tomato = new Tomato(800, 500);
        this.enemies.push(tomato);
        
        console.log(`👹 Created ${this.enemies.length} test enemies`);
    }

    /**
     * Get all enemies
     */
    getEnemies() {
        return this.enemies;
    }

    /**
     * Get enemy count
     */
    getEnemyCount() {
        return this.enemies.length;
    }

    /**
     * Get alive enemy count
     */
    getAliveEnemyCount() {
        return this.enemies.filter(enemy => enemy.isAlive).length;
    }

    /**
     * Clear all enemies
     */
    clearEnemies() {
        this.enemies = [];
        console.log('🗑️ All enemies cleared');
    }

    /**
     * Reset enemy manager
     */
    reset() {
        this.clearEnemies();
        this.spawnTimer = 0;
    }

    /**
     * Set spawn interval
     */
    setSpawnInterval(interval) {
        this.spawnInterval = interval;
    }

    /**
     * Set max enemies
     */
    setMaxEnemies(maxEnemies) {
        this.maxEnemies = maxEnemies;
    }

    /**
     * Add enemy type
     */
    addEnemyType(type) {
        if (!this.enemyTypes.includes(type)) {
            this.enemyTypes.push(type);
        }
    }

    /**
     * Remove enemy type
     */
    removeEnemyType(type) {
        const index = this.enemyTypes.indexOf(type);
        if (index > -1) {
            this.enemyTypes.splice(index, 1);
        }
    }

    /**
     * Get enemy at position
     */
    getEnemyAtPosition(x, y) {
        for (const enemy of this.enemies) {
            if (enemy.isAlive && this.isPositionInEnemy(x, y, enemy)) {
                return enemy;
            }
        }
        return null;
    }

    /**
     * Check if position is inside enemy
     */
    isPositionInEnemy(x, y, enemy) {
        const bounds = enemy.getBounds();
        return x >= bounds.x && 
               x <= bounds.x + bounds.width &&
               y >= bounds.y && 
               y <= bounds.y + bounds.height;
    }

    /**
     * Get enemies in area
     */
    getEnemiesInArea(x, y, width, height) {
        return this.enemies.filter(enemy => {
            if (!enemy.isAlive) return false;
            
            const bounds = enemy.getBounds();
            return bounds.x < x + width &&
                   bounds.x + bounds.width > x &&
                   bounds.y < y + height &&
                   bounds.y + bounds.height > y;
        });
    }

    /**
     * Get spawn timer progress (0-1)
     */
    getSpawnProgress() {
        return this.spawnTimer / this.spawnInterval;
    }

    /**
     * Force spawn enemy
     */
    forceSpawnEnemy(type = null) {
        const enemyType = type || this.getRandomEnemyType();
        const spawnPosition = this.getRandomSpawnPosition();
        const enemy = this.createEnemy(enemyType, spawnPosition.x, spawnPosition.y);
        
        if (enemy) {
            this.enemies.push(enemy);
            return enemy;
        }
        return null;
    }

    /**
     * Get manager info for debugging
     */
    getManagerInfo() {
        return {
            enemyCount: this.enemies.length,
            aliveCount: this.getAliveEnemyCount(),
            spawnTimer: this.spawnTimer,
            spawnInterval: this.spawnInterval,
            maxEnemies: this.maxEnemies,
            enemyTypes: [...this.enemyTypes]
        };
    }
}
