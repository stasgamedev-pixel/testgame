/**
 * Difficulty System - Manages game progression
 */

import CONSTANTS from '../core/constants.js';

export class DifficultySystem {
    constructor() {
        this.gameSpeed = CONSTANTS.BASE_SPEED;
        this.speedTimer = 0;
        this.distance = 0;
        this.totalCoins = 0;
    }
    
    update(deltaTime) {
        // Increase distance
        this.distance += CONSTANTS.PLAYER_SPEED * this.gameSpeed * deltaTime;
        
        // Increase speed every 30 seconds
        this.speedTimer += deltaTime * 1000;
        if (this.speedTimer >= CONSTANTS.SPEED_INCREASE_INTERVAL) {
            this.speedTimer = 0;
            this.gameSpeed += CONSTANTS.SPEED_INCREASE_AMOUNT;
        }
    }
    
    addCoins(amount) {
        this.totalCoins += amount;
    }
    
    getScore() {
        return Math.floor(this.distance / 10);
    }
    
    reset() {
        this.gameSpeed = CONSTANTS.BASE_SPEED;
        this.speedTimer = 0;
        this.distance = 0;
        this.totalCoins = 0;
    }
}

export default DifficultySystem;
