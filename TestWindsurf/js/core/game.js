// Game Core
// Main game loop and state management for Funny Baxi: Run and Jump

import { CANVAS_WIDTH, CANVAS_HEIGHT, GAME_STATES } from './constants.js';
import { INPUT_ACTIONS } from './game-config.js';
import { TimeUtils } from '../utils/time-utils.js';
import { FPSCounter } from '../utils/fps-counter.js';
import { InputManager } from './input.js';
import { Player } from '../entities/player.js';
import { CollisionSystem } from '../systems/collision.js';
import { EnemyManager } from '../systems/enemy-manager.js';
import { GameRenderer } from '../systems/game-renderer.js';

/**
 * Game Class
 * Main game loop and state management
 */
export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.state = GAME_STATES.LOADING;
        this.lastTime = 0;
        this.deltaTime = 0;
        this.fpsCounter = new FPSCounter();
        this.isRunning = false;
        this.isPaused = false;
        
        // Core systems
        this.inputManager = new InputManager();
        this.player = null;
        this.collisionSystem = new CollisionSystem();
        
        // Manager systems
        this.enemyManager = new EnemyManager();
        this.renderer = new GameRenderer(ctx);
    }

    /**
     * Start the game
     */
    start() {
        this.inputManager.init();
        this.player = new Player(200, 500); // Start position
        
        // Create test enemies for collision testing
        this.enemyManager.createTestEnemies();
        
        this.loadSprites().then(() => {
            this.state = GAME_STATES.PLAYING;
            this.isRunning = true;
            this.lastTime = TimeUtils.now();
            this.gameLoop();
            console.log('🚀 Game started successfully!');
        }).catch(error => {
            console.error('❌ Failed to load sprites:', error);
            // Start game anyway with fallback graphics
            this.state = GAME_STATES.PLAYING;
            this.isRunning = true;
            this.lastTime = TimeUtils.now();
            this.gameLoop();
        });
    }

    /**
     * Load game sprites
     */
    async loadSprites() {
        if (this.player) {
            await this.player.initSprites();
        }
    }

    /**
     * Stop the game
     */
    stop() {
        this.isRunning = false;
        this.isPaused = false;
        this.state = GAME_STATES.STOPPED;
    }

    /**
     * Pause the game
     */
    pause() {
        if (!this.isPaused && this.isRunning) {
            this.isPaused = true;
            this.state = GAME_STATES.PAUSED;
        }
    }

    /**
     * Resume the game
     */
    resume() {
        if (this.isPaused) {
            this.isPaused = false;
            this.state = GAME_STATES.PLAYING;
            this.lastTime = TimeUtils.now();
            this.gameLoop();
        }
    }

    /**
     * Main game loop
     */
    gameLoop() {
        if (!this.isRunning || this.isPaused) return;

        const currentTime = TimeUtils.now();
        this.deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Update FPS counter
        this.fpsCounter.update(currentTime);

        // Update game state
        this.update(this.deltaTime);

        // Render game
        this.render();

        // Continue loop
        requestAnimationFrame(() => this.gameLoop());
    }

    /**
     * Update game logic
     */
    update(deltaTime) {
        // Process input
        this.processInput();
        
        // Update player
        if (this.player) {
            this.player.update(deltaTime, this.inputManager);
        }
        
        // Update enemies
        this.enemyManager.update(deltaTime, this.state);
        
        // Check collisions
        this.checkCollisions();
    }

    /**
     * Check collisions between player and enemies
     */
    checkCollisions() {
        if (this.player && this.enemyManager.getEnemyCount() > 0) {
            this.collisionSystem.checkCollisions(this.player, this.enemyManager.getEnemies());
        }
    }

    /**
     * Process input and handle actions
     */
    processInput() {
        // Check for pause action
        if (this.inputManager.isActionActive(INPUT_ACTIONS.PAUSE)) {
            if (this.state === GAME_STATES.PLAYING) {
                this.pause();
            } else if (this.state === GAME_STATES.PAUSED) {
                this.resume();
            }
        }
        
        // Jump action is handled by Player class
    }

    /**
     * Render game
     */
    render() {
        // Use renderer to render everything
        this.renderer.render(this.player, this.enemyManager.getEnemies());
        
        // Render FPS counter
        this.renderFPS();
        
        // Render pause screen if paused
        if (this.isPaused) {
            this.renderer.renderPauseScreen();
        }
        
        // Render game over if player is dead
        if (this.player && !this.player.isAlive) {
            this.renderer.renderGameOver(this.player);
        }
    }

    /**
     * Render FPS counter
     */
    renderFPS() {
        this.ctx.fillStyle = '#333333';
        this.ctx.font = '16px Arial';
        this.ctx.fillText(`FPS: ${this.fpsCounter.getFPS()}`, 100, 30);
    }

    /**
     * Get current game state
     */
    getState() {
        return this.state;
    }

    /**
     * Get current FPS
     */
    getFPS() {
        return this.fpsCounter.getFPS();
    }

    /**
     * Get player instance
     */
    getPlayer() {
        return this.player;
    }

    /**
     * Get enemy manager
     */
    getEnemyManager() {
        return this.enemyManager;
    }

    /**
     * Get collision system
     */
    getCollisionSystem() {
        return this.collisionSystem;
    }

    /**
     * Get renderer
     */
    getRenderer() {
        return this.renderer;
    }

    /**
     * Reset game
     */
    reset() {
        // Reset player
        if (this.player) {
            this.player.reset();
        }
        
        // Reset enemies
        this.enemyManager.reset();
        this.enemyManager.createTestEnemies();
        
        // Reset game state
        this.state = GAME_STATES.PLAYING;
        this.isRunning = true;
        this.isPaused = false;
        
        console.log('🔄 Game reset!');
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Canvas scaling will be implemented later
    }

    /**
     * Get game info for debugging
     */
    getGameInfo() {
        return {
            state: this.state,
            isRunning: this.isRunning,
            isPaused: this.isPaused,
            fps: this.fpsCounter.getFPS(),
            deltaTime: this.deltaTime,
            playerAlive: this.player ? this.player.isAlive : false,
            enemyCount: this.enemyManager.getEnemyCount(),
            collisionEvents: this.collisionSystem.getEventCount()
        };
    }

    /**
     * Handle visibility change
     */
    handleVisibilityChange() {
        if (document.hidden) {
            this.pause();
        } else {
            this.resume();
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Canvas scaling will be implemented later
    }
}
