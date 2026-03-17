/**
 * Collision System
 */

import { checkCollision } from '../core/utils.js';

export class CollisionSystem {
    constructor() {
        this.pitZones = [];
        this.spikeZones = [];
    }
    
    checkPlayerEnemy(player, enemy) {
        const playerBounds = player.getBounds();
        const enemyBounds = enemy.getBounds();
        
        if (!checkCollision(playerBounds, enemyBounds)) {
            return null;
        }
        
        // Check if player is attacking from above (butt attack)
        const playerBottom = player.y + player.height;
        const enemyTop = enemy.y;
        const playerAbove = playerBottom < enemyTop + enemy.height * 0.5;
        const playerFalling = player.vy > 0;
        
        if (playerAbove && playerFalling && player.isAttacking) {
            // Player defeats enemy
            return 'enemyDefeated';
        } else {
            // Player takes damage
            return 'playerHit';
        }
    }
    
    checkPlayerItem(player, item) {
        if (item.collected) return false;
        
        const playerBounds = player.getBounds();
        const itemBounds = item.getBounds();
        
        if (checkCollision(playerBounds, itemBounds)) {
            item.collected = true;
            return true;
        }
        return false;
    }
    
    checkPlayerPit(player, pitX, pitWidth) {
        const playerCenter = player.x + player.width / 2;
        
        if (playerCenter > pitX && playerCenter < pitX + pitWidth) {
            if (player.y + player.height >= 550) { // Ground level
                return true; // Fell in pit
            }
        }
        return false;
    }
    
    checkPlayerSpikes(player, spike) {
        const playerBounds = player.getBounds();
        const spikeBounds = spike.getBounds();
        
        return checkCollision(playerBounds, spikeBounds);
    }
    
    addPit(x, width) {
        this.pitZones.push({ x, width });
    }
    
    addSpike(x, y, width, height) {
        this.spikeZones.push({ x, y, width, height });
    }
    
    clearPits() {
        this.pitZones = [];
    }
    
    clearSpikes() {
        this.spikeZones = [];
    }
}

export default CollisionSystem;
