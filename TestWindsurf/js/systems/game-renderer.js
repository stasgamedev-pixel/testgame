// Game Renderer Module
// Handles all rendering operations for the game

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../core/constants.js';
import { CanvasUtils } from '../utils/canvas-utils.js';

/**
 * Game Renderer Class
 * Manages all rendering operations
 */
export class GameRenderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.backgroundColor = '#98E8C1';
        this.groundColor = '#7CB342';
        this.groundY = 500;
        this.groundHeight = 220;
    }

    /**
     * Render entire game scene
     */
    render(player, enemies) {
        this.clearCanvas();
        this.renderBackground();
        this.renderGround();
        this.renderEnemies(enemies);
        this.renderPlayer(player);
        this.renderDebugInfo(enemies, player);
    }

    /**
     * Clear canvas
     */
    clearCanvas() {
        CanvasUtils.clear(this.ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    /**
     * Render background
     */
    renderBackground() {
        CanvasUtils.fillRect(this.ctx, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, this.backgroundColor);
    }

    /**
     * Render ground
     */
    renderGround() {
        CanvasUtils.fillRect(
            this.ctx, 
            0, 
            this.groundY, 
            CANVAS_WIDTH, 
            this.groundHeight, 
            this.groundColor
        );
    }

    /**
     * Render all enemies
     */
    renderEnemies(enemies) {
        console.log('🎮 renderEnemies called with', enemies.length, 'enemies');
        for (const enemy of enemies) {
            console.log('🎮 Processing enemy:', enemy.constructor.name, 'alive:', enemy.isAlive);
            if (enemy.isAlive) {
                console.log('🎮 Calling enemy.render()');
                enemy.render(this.ctx);
            }
        }
    }

    /**
     * Render player
     */
    renderPlayer(player) {
        if (player.isAlive) {
            player.render(this.ctx);
        }
    }

    /**
     * Render debug information
     */
    renderDebugInfo(enemies, player) {
        this.renderFPS();
        this.renderEnemyCount(enemies);
        this.renderPlayerHealth(player);
    }

    /**
     * Render FPS counter
     */
    renderFPS() {
        // This would be passed from game class
        // CanvasUtils.drawText(this.ctx, `FPS: ${fps}`, 100, 30, 20, '#333333');
    }

    /**
     * Render enemy count
     */
    renderEnemyCount(enemies) {
        const aliveCount = enemies.filter(e => e.isAlive).length;
        CanvasUtils.drawText(this.ctx, `Enemies: ${aliveCount}`, 100, 60, 16, '#333333');
    }

    /**
     * Render player health
     */
    renderPlayerHealth(player) {
        if (!player) return;
        
        const health = player.health;
        const maxHealth = player.maxHealth;
        const heartsCount = Math.ceil(health);
        
        // Render hearts
        for (let i = 0; i < maxHealth; i++) {
            const x = 20 + i * 35;
            const y = 30;
            const isFull = i < health;
            
            this.renderHeart(x, y, isFull);
        }
        
        // Render health text
        CanvasUtils.drawText(this.ctx, `HP: ${health}/${maxHealth}`, 20, 70, 14, '#333333');
    }

    /**
     * Render heart icon
     */
    renderHeart(x, y, isFull) {
        const size = 20;
        const color = isFull ? '#E91E63' : '#CCCCCC';
        
        // Simple heart shape using rectangles
        this.ctx.fillStyle = color;
        
        // Left circle
        this.ctx.fillRect(x, y, size * 0.6, size * 0.6);
        
        // Right circle
        this.ctx.fillRect(x + size * 0.4, y, size * 0.6, size * 0.6);
        
        // Bottom triangle
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + size * 0.3);
        this.ctx.lineTo(x + size, y + size * 0.3);
        this.ctx.lineTo(x + size * 0.5, y + size);
        this.ctx.closePath();
        this.ctx.fill();
    }

    /**
     * Render game over screen
     */
    renderGameOver(player) {
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // Game over text
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = 'bold 48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
        
        // Score text
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Press SPACE to restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
        
        // Reset text alignment
        this.ctx.textAlign = 'left';
    }

    /**
     * Render pause screen
     */
    renderPauseScreen() {
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // Pause text
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = 'bold 48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('PAUSED', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        
        // Instructions
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Press P to resume', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);
        
        // Reset text alignment
        this.ctx.textAlign = 'left';
    }

    /**
     * Render loading screen
     */
    renderLoadingScreen(progress = 0) {
        this.clearCanvas();
        
        // Loading text
        this.ctx.fillStyle = '#333333';
        this.ctx.font = 'bold 32px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('LOADING...', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
        
        // Progress bar
        const barWidth = 300;
        const barHeight = 20;
        const barX = (CANVAS_WIDTH - barWidth) / 2;
        const barY = CANVAS_HEIGHT / 2;
        
        // Background
        this.ctx.fillStyle = '#CCCCCC';
        this.ctx.fillRect(barX, barY, barWidth, barHeight);
        
        // Progress
        this.ctx.fillStyle = '#4CAF50';
        this.ctx.fillRect(barX, barY, barWidth * progress, barHeight);
        
        // Progress text
        this.ctx.fillStyle = '#333333';
        this.ctx.font = '16px Arial';
        this.ctx.fillText(`${Math.round(progress * 100)}%`, CANVAS_WIDTH / 2, barY + 40);
        
        // Reset text alignment
        this.ctx.textAlign = 'left';
    }

    /**
     * Set background color
     */
    setBackgroundColor(color) {
        this.backgroundColor = color;
    }

    /**
     * Set ground color
     */
    setGroundColor(color) {
        this.groundColor = color;
    }

    /**
     * Set ground position
     */
    setGroundPosition(y, height) {
        this.groundY = y;
        this.groundHeight = height;
    }

    /**
     * Get rendering context
     */
    getContext() {
        return this.ctx;
    }

    /**
     * Get canvas dimensions
     */
    getCanvasDimensions() {
        return {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT
        };
    }

    /**
     * Render custom text with shadow
     */
    renderTextWithShadow(text, x, y, fontSize, color, shadowColor = '#000000') {
        // Shadow
        this.ctx.fillStyle = shadowColor;
        this.ctx.font = `${fontSize}px Arial`;
        this.ctx.fillText(text, x + 2, y + 2);
        
        // Text
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
    }

    /**
     * Get renderer info for debugging
     */
    getRendererInfo() {
        return {
            backgroundColor: this.backgroundColor,
            groundColor: this.groundColor,
            groundY: this.groundY,
            groundHeight: this.groundHeight,
            canvasDimensions: this.getCanvasDimensions()
        };
    }
}
