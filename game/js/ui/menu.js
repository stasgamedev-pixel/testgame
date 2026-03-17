/**
 * UI Manager - Handles all UI screens and updates
 */

import CONSTANTS from '../core/constants.js';

export class UIManager {
    constructor() {
        this.screens = [];
        this.currentScreen = 'menu-screen';
    }
    
    init() {
        // Get all screens
        this.screens = document.querySelectorAll('.screen');
        
        // Setup button listeners
        this.setupButtonListeners();
        
        // Show menu initially
        this.showScreen('menu-screen');
    }
    
    setupButtonListeners() {
        // Menu buttons
        const btnPlay = document.getElementById('btn-play');
        const btnShop = document.getElementById('btn-shop');
        const btnSettings = document.getElementById('btn-settings');
        
        if (btnPlay) btnPlay.addEventListener('click', () => this.onPlay());
        if (btnShop) btnShop.addEventListener('click', () => this.onShop());
        if (btnSettings) btnSettings.addEventListener('click', () => this.onSettings());
        
        // Pause screen buttons
        const btnResume = document.getElementById('btn-resume');
        const btnMenuFromPause = document.getElementById('btn-menu-from-pause');
        
        if (btnResume) btnResume.addEventListener('click', () => this.onResume());
        if (btnMenuFromPause) btnMenuFromPause.addEventListener('click', () => this.onMenu());
        
        // Game over buttons
        const btnRetry = document.getElementById('btn-retry');
        const btnContinueAd = document.getElementById('btn-continue-ad');
        const btnMenuFromGameover = document.getElementById('btn-menu-from-gameover');
        
        if (btnRetry) btnRetry.addEventListener('click', () => this.onRetry());
        if (btnContinueAd) btnContinueAd.addEventListener('click', () => this.onContinueAd());
        if (btnMenuFromGameover) btnMenuFromGameover.addEventListener('click', () => this.onMenu());
        
        // Shop button
        const btnBackFromShop = document.getElementById('btn-back-from-shop');
        if (btnBackFromShop) btnBackFromShop.addEventListener('click', () => this.onMenu());
        
        // Settings button
        const btnBackFromSettings = document.getElementById('btn-back-from-settings');
        if (btnBackFromSettings) btnBackFromSettings.addEventListener('click', () => this.onMenu());
        
        // Pause button in HUD
        const btnPause = document.getElementById('btn-pause');
        if (btnPause) btnPause.addEventListener('click', () => this.onPause());
        
        // Volume sliders
        const musicVolume = document.getElementById('music-volume');
        const sfxVolume = document.getElementById('sfx-volume');
        
        if (musicVolume) musicVolume.addEventListener('input', (e) => this.onMusicVolumeChange(e.target.value));
        if (sfxVolume) sfxVolume.addEventListener('input', (e) => this.onSFXVolumeChange(e.target.value));
    }
    
    showScreen(screenId) {
        this.screens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
        }
    }
    
    updateHUD(score, coins, hp) {
        const scoreDisplay = document.getElementById('score-display');
        const coinsDisplay = document.getElementById('coins-display');
        const heartsDisplay = document.getElementById('hearts-display');
        
        if (scoreDisplay) {
            scoreDisplay.textContent = `🏃 ${score}м`;
        }
        
        if (coinsDisplay) {
            coinsDisplay.textContent = `🪙 ${coins}`;
        }
        
        if (heartsDisplay) {
            let hearts = '';
            for (let i = 0; i < hp; i++) {
                hearts += '❤️';
            }
            // Add half hearts if needed
            if (hp % 1 !== 0) {
                hearts += '💔';
            }
            heartsDisplay.textContent = hearts;
        }
    }
    
    updateGameOver(score, coins, bestScore) {
        const finalScore = document.getElementById('final-score');
        const finalCoins = document.getElementById('final-coins');
        const bestScoreEl = document.getElementById('best-score');
        
        if (finalScore) finalScore.textContent = `Счет: ${score}м`;
        if (finalCoins) finalCoins.textContent = `Монет: ${coins}`;
        if (bestScoreEl) bestScoreEl.textContent = `Рекорд: ${bestScore}м`;
    }
    
    // Event callbacks - to be overridden by Game
    onPlay() {}
    onShop() {}
    onSettings() {}
    onResume() {}
    onRetry() {}
    onContinueAd() {}
    onMenu() {}
    onPause() {}
    onMusicVolumeChange(value) {}
    onSFXVolumeChange(value) {}
    
    setCallbacks(callbacks) {
        this.callbacks = callbacks;
    }
}

export default UIManager;
