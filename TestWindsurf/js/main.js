// Main Entry Point for Funny Baxi: Run and Jump
// ES6 Module - Game Initialization and Bootstrap

import { Game } from './core/game.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './core/constants.js';
import { LoadingManager } from './utils/loading-manager.js';

/**
 * Main Application Class
 * Handles game initialization, loading, and startup
 */
class Main {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.game = null;
        this.loadingManager = null;
    }

    /**
     * Initialize game
     */
    async init() {
        try {
            console.log('🎮 Initializing Funny Baxi...');
            this.setupCanvas();
            this.loadingManager = new LoadingManager();
            await this.loadAssets();
            this.game = new Game(this.canvas, this.ctx);
            this.startGame();
            console.log('✅ Game initialized successfully!');
        } catch (error) {
            console.error('❌ Failed to initialize game:', error);
            this.showError(error.message);
        }
    }

    /**
     * Setup canvas and get 2D context
     */
    setupCanvas() {
        this.canvas = document.getElementById('game-canvas');
        if (!this.canvas) throw new Error('Canvas element not found!');
        
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) throw new Error('Failed to get 2D context!');
        
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.ctx.imageSmoothingEnabled = false;
        console.log(`📐 Canvas setup: ${CANVAS_WIDTH}x${CANVAS_HEIGHT}`);
    }

    /**
     * Load game assets
     */
    async loadAssets() {
        console.log('📦 Loading assets...');
        this.updateLoadingProgress(0.1);
        await this.simulateAssetLoading();
        this.updateLoadingProgress(1.0);
        console.log('✅ Assets loaded successfully!');
    }

    /**
     * Simulate asset loading (placeholder)
     */
    simulateAssetLoading() {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * Update loading screen progress
     */
    updateLoadingProgress(progress) {
        const progressBar = document.querySelector('.loading-progress');
        if (progressBar) {
            progressBar.style.width = `${progress * 100}%`;
        }
    }

    /**
     * Start game
     */
    startGame() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) loadingScreen.classList.add('hidden');
        this.game.start();
        console.log('🚀 Game started!');
    }

    /**
     * Show error message
     */
    showError(message) {
        const loadingContent = document.querySelector('.loading-content');
        if (loadingContent) {
            loadingContent.innerHTML = `
                <h1>❌ Ошибка</h1>
                <p>${message}</p>
                <button onclick="location.reload()">Перезагрузить</button>
            `;
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌐 DOM loaded, starting game initialization...');
    const main = new Main();
    await main.init();
});

// Handle visibility change (pause/resume)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('⏸️ Tab hidden - pause game');
    } else {
        console.log('▶️ Tab visible - resume game');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    console.log('📱 Window resized');
});

export { Main };
