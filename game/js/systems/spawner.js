/**
 * Spawner System - Manages enemy and item spawning
 */

import CONSTANTS from '../core/constants.js';
import { randomRange, randomInt } from '../core/utils.js';
import { Carrot } from '../entities/enemies/carrot.js';
import { Tomato } from '../entities/enemies/tomato.js';
import { Coin } from '../entities/items/coin.js';
import { Heart } from '../entities/items/heart.js';

export class Spawner {
    constructor(canvasWidth) {
        this.canvasWidth = canvasWidth;
        this.enemyTimer = 0;
        this.coinTimer = 0;
        this.heartTimer = 0;
        this.pitTimer = 0;
        
        this.enemies = [];
        this.coins = [];
        this.hearts = [];
        this.pits = [];
        this.spikes = [];
    }
    
    update(deltaTime, gameSpeed, distance) {
        // Enemy spawning
        const currentEnemyInterval = randomRange(
            CONSTANTS.ENEMY_SPAWN_INTERVAL_MIN / gameSpeed,
            CONSTANTS.ENEMY_SPAWN_INTERVAL_MAX / gameSpeed
        );
        
        this.enemyTimer += deltaTime * 1000;
        if (this.enemyTimer >= currentEnemyInterval) {
            this.enemyTimer = 0;
            this.spawnEnemy();
        }
        
        // Coin spawning
        const currentCoinInterval = randomRange(
            CONSTANTS.COIN_SPAWN_INTERVAL_MIN / gameSpeed,
            CONSTANTS.COIN_SPAWN_INTERVAL_MAX / gameSpeed
        );
        
        this.coinTimer += deltaTime * 1000;
        if (this.coinTimer >= currentCoinInterval) {
            this.coinTimer = 0;
            this.spawnCoins();
        }
        
        // Heart spawning (rare)
        const currentHeartInterval = randomRange(
            CONSTANTS.HEART_SPAWN_INTERVAL_MIN / gameSpeed,
            CONSTANTS.HEART_SPAWN_INTERVAL_MAX / gameSpeed
        );
        
        this.heartTimer += deltaTime * 1000;
        if (this.heartTimer >= currentHeartInterval) {
            this.heartTimer = 0;
            this.spawnHeart();
        }
        
        // Pit spawning
        this.pitTimer += deltaTime * 1000;
        if (this.pitTimer >= 45000 / gameSpeed) { // Every ~45 seconds
            this.pitTimer = 0;
            this.spawnPit();
        }
    }
    
    spawnEnemy() {
        const x = this.canvasWidth + 50;
        const groundY = CONSTANTS.GROUND_Y;
        
        // Random enemy type
        const types = ['carrot', 'tomato'];
        const type = types[randomInt(0, types.length - 1)];
        
        if (type === 'carrot') {
            const y = groundY - 50;
            this.enemies.push(new Carrot(x, y));
        } else {
            const y = groundY - 48;
            this.enemies.push(new Tomato(x, y));
        }
    }
    
    spawnCoins() {
        const startX = this.canvasWidth + 50;
        const groundY = CONSTANTS.GROUND_Y;
        
        // Random pattern: arc or line
        const pattern = randomInt(0, 1);
        
        if (pattern === 0) {
            // Arc pattern in air
            for (let i = 0; i < CONSTANTS.COINS_PER_SPAWN; i++) {
                const x = startX + i * 50;
                const y = groundY - 150 - Math.sin(i * 0.5) * 80;
                this.coins.push(new Coin(x, y));
            }
        } else {
            // Line pattern on ground
            for (let i = 0; i < CONSTANTS.COINS_PER_SPAWN; i++) {
                const x = startX + i * 50;
                const y = groundY - 50;
                this.coins.push(new Coin(x, y));
            }
        }
    }
    
    spawnHeart() {
        const x = this.canvasWidth + 50;
        const y = CONSTANTS.GROUND_Y - 100;
        this.hearts.push(new Heart(x, y));
    }
    
    spawnPit() {
        const x = this.canvasWidth + 200;
        const width = randomRange(100, 200);
        this.pits.push({ x, width });
    }
    
    removeOffScreen() {
        this.enemies = this.enemies.filter(e => e.x + e.width > -100);
        this.coins = this.coins.filter(c => c.x + c.width > -100 && !c.collected);
        this.hearts = this.hearts.filter(h => h.x + h.width > -100 && !h.collected);
        this.pits = this.pits.filter(p => p.x + p.width > -100);
    }
    
    clear() {
        this.enemies = [];
        this.coins = [];
        this.hearts = [];
        this.pits = [];
        this.spikes = [];
        this.enemyTimer = 0;
        this.coinTimer = 0;
        this.heartTimer = 0;
    }
}

export default Spawner;
