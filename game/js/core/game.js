/**
 * Main Game Class - Core game loop and logic
 */

import CONSTANTS from './constants.js';
import { Player } from '../entities/player.js';
import { CollisionSystem } from '../systems/collision.js';
import { Spawner } from '../systems/spawner.js';
import { DifficultySystem } from '../systems/difficulty.js';
import { AudioManager } from '../audio/audio-manager.js';
import { SaveManager } from '../save/save-manager.js';
import { UIManager } from '../ui/menu.js';
import { Shop } from '../shop/shop.js';
import { YandexPlatform } from '../platform/yandex.js';

export class Game {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.lastTime = 0;
        this.state = CONSTANTS.STATE.MENU;
        
        this.player = null;
        this.collision = null;
        this.spawner = null;
        this.difficulty = null;
        this.audio = null;
        this.saveManager = null;
        this.ui = null;
        this.shop = null;
        this.yandex = null;
        
        this.sessionCoins = 0;
        this.canContinue = false;
    }
    
    async init() {
        // Setup canvas
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Initialize managers
        this.saveManager = new SaveManager();
        await this.saveManager.initYandexSDK();
        
        this.yandex = new YandexPlatform();
        await this.yandex.init();
        
        this.audio = new AudioManager();
        this.audio.init();
        this.audio.setMusicVolume(this.saveManager.getMusicVolume());
        this.audio.setSFXVolume(this.saveManager.getSFXVolume());
        
        this.ui = new UIManager();
        this.ui.init();
        this.ui.setCallbacks({
            onPlay: () => this.startGame(),
            onShop: () => this.openShop(),
            onSettings: () => this.ui.showScreen('settings-screen'),
            onResume: () => this.resumeGame(),
            onRetry: () => this.startGame(),
            onContinueAd: () => this.continueWithAd(),
            onMenu: () => this.goToMenu(),
            onPause: () => this.pauseGame(),
            onMusicVolumeChange: (v) => {
                this.audio.setMusicVolume(v);
                this.saveManager.setMusicVolume(v);
            },
            onSFXVolumeChange: (v) => {
                this.audio.setSFXVolume(v);
                this.saveManager.setSFXVolume(v);
            }
        });
        
        this.shop = new Shop(this.saveManager, this.ui);
        
        // Initialize game objects
        this.player = new Player(this.canvas.width, this.canvas.height);
        this.collision = new CollisionSystem();
        this.spawner = new Spawner(this.canvas.width);
        this.difficulty = new DifficultySystem();
        
        // Set player skin
        const selectedSkin = CONSTANTS.SKINS.find(s => s.id === this.saveManager.getSelectedSkin());
        if (selectedSkin) {
            this.player.setSkin(selectedSkin.color);
        }
        
        // Setup input handlers
        this.setupInputHandlers();
        
        // Handle visibility change (pause on tab switch)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.state === CONSTANTS.STATE.PLAYING) {
                this.pauseGame();
            } else if (!document.hidden && this.state === CONSTANTS.STATE.PAUSED) {
                // Don't auto-resume, let player press continue
            }
        });
        
        // Start render loop
        requestAnimationFrame((t) => this.gameLoop(t));
    }
    
    resizeCanvas() {
        const container = document.getElementById('game-container');
        const aspectRatio = CONSTANTS.CANVAS_WIDTH / CONSTANTS.CANVAS_HEIGHT;
        
        let width = container.clientWidth;
        let height = container.clientHeight;
        
        if (width / height > aspectRatio) {
            width = height * aspectRatio;
        } else {
            height = width / aspectRatio;
        }
        
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.canvas.width = CONSTANTS.CANVAS_WIDTH;
        this.canvas.height = CONSTANTS.CANVAS_HEIGHT;
    }
    
    setupInputHandlers() {
        // Keyboard
        window.addEventListener('keydown', (e) => {
            if (this.state === CONSTANTS.STATE.PLAYING) {
                if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
                    e.preventDefault();
                    this.handleJump();
                }
                if (e.code === 'Escape' || e.code === 'KeyP') {
                    e.preventDefault();
                    this.pauseGame();
                }
            } else if (this.state === CONSTANTS.STATE.PAUSED) {
                if (e.code === 'Escape' || e.code === 'KeyP') {
                    e.preventDefault();
                    this.resumeGame();
                }
            }
        });
        
        // Mouse/Touch
        this.canvas.addEventListener('mousedown', (e) => {
            if (this.state === CONSTANTS.STATE.PLAYING) {
                this.handleJump();
            }
        });
        
        this.canvas.addEventListener('touchstart', (e) => {
            if (this.state === CONSTANTS.STATE.PLAYING) {
                e.preventDefault();
                this.handleJump();
            }
        }, { passive: false });
        
        // Window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    handleJump() {
        if (this.player.isJumping) {
            // Try attack
            if (this.player.attack()) {
                this.audio.play('attack');
            }
        } else {
            // Jump
            if (this.player.jump()) {
                this.audio.play('jump');
            }
        }
    }
    
    startGame() {
        this.state = CONSTANTS.STATE.PLAYING;
        this.ui.showScreen('hud-screen');
        
        // Reset game state
        this.player = new Player(this.canvas.width, this.canvas.height);
        const selectedSkin = CONSTANTS.SKINS.find(s => s.id === this.saveManager.getSelectedSkin());
        if (selectedSkin) {
            this.player.setSkin(selectedSkin.color);
        }
        
        this.spawner.clear();
        this.difficulty.reset();
        this.sessionCoins = 0;
        this.canContinue = false;
        
        this.lastTime = performance.now();
    }
    
    pauseGame() {
        if (this.state === CONSTANTS.STATE.PLAYING) {
            this.state = CONSTANTS.STATE.PAUSED;
            this.ui.showScreen('pause-screen');
            this.audio.suspend();
        }
    }
    
    resumeGame() {
        if (this.state === CONSTANTS.STATE.PAUSED) {
            this.state = CONSTANTS.STATE.PLAYING;
            this.ui.showScreen('hud-screen');
            this.audio.resume();
            this.lastTime = performance.now();
        }
    }
    
    gameOver() {
        this.state = CONSTANTS.STATE.GAMEOVER;
        
        const score = this.difficulty.getScore();
        const totalCoins = this.sessionCoins;
        const bestScore = Math.max(score, this.saveManager.getBestScore());
        
        this.saveManager.addCoins(totalCoins);
        this.saveManager.updateBestScore(bestScore);
        
        this.ui.updateGameOver(score, totalCoins, bestScore);
        this.ui.showScreen('gameover-screen');
        
        // Show interstitial ad after death
        setTimeout(() => {
            this.yandex.showInterstitial();
        }, 1000);
        
        this.canContinue = true;
    }
    
    continueWithAd() {
        if (this.canContinue) {
            this.yandex.showRewardedVideo().then((rewarded) => {
                if (rewarded) {
                    // Revive player
                    this.player.hp = CONSTANTS.MAX_HP;
                    this.player.invincible = true;
                    this.player.invincibleTimer = 2000;
                    this.state = CONSTANTS.STATE.PLAYING;
                    this.ui.showScreen('hud-screen');
                    this.canContinue = false;
                    this.lastTime = performance.now();
                }
            });
        }
    }
    
    goToMenu() {
        this.state = CONSTANTS.STATE.MENU;
        this.ui.showScreen('menu-screen');
    }
    
    openShop() {
        this.shop.show();
    }
    
    update(deltaTime) {
        if (this.state !== CONSTANTS.STATE.PLAYING) return;
        
        // Update difficulty
        this.difficulty.update(deltaTime);
        
        // Update spawner
        this.spawner.update(deltaTime, this.difficulty.gameSpeed, this.difficulty.distance);
        
        // Update player
        this.player.update(deltaTime);
        
        // Update enemies
        this.spawner.enemies.forEach(enemy => {
            enemy.update(deltaTime, this.difficulty.gameSpeed);
        });
        
        // Update coins
        this.spawner.coins.forEach(coin => {
            coin.update(deltaTime, this.difficulty.gameSpeed);
        });
        
        // Update hearts
        this.spawner.hearts.forEach(heart => {
            heart.update(deltaTime, this.difficulty.gameSpeed);
        });
        
        // Remove off-screen objects
        this.spawner.removeOffScreen();
        
        // Check collisions
        this.checkCollisions();
        
        // Check pits
        this.spawner.pits.forEach(pit => {
            if (this.collision.checkPlayerPit(this.player, pit.x, pit.width)) {
                this.player.hp = 0;
            }
        });
        
        // Check death
        if (this.player.hp <= 0) {
            this.gameOver();
        }
        
        // Update HUD
        this.ui.updateHUD(
            this.difficulty.getScore(),
            this.sessionCoins,
            this.player.hp
        );
    }
    
    checkCollisions() {
        // Player vs Enemies
        this.spawner.enemies.forEach(enemy => {
            if (!enemy.isDead) {
                const result = this.collision.checkPlayerEnemy(this.player, enemy);
                
                if (result === 'enemyDefeated') {
                    enemy.isDead = true;
                    this.audio.play('attack');
                    // Bonus for defeating enemy
                    this.sessionCoins += 1;
                } else if (result === 'playerHit') {
                    if (this.player.takeDamage(0.5)) {
                        this.audio.play('hit');
                    }
                }
            }
        });
        
        // Player vs Coins
        this.spawner.coins.forEach(coin => {
            if (this.collision.checkPlayerItem(this.player, coin)) {
                const location = CONSTANTS.LOCATIONS.find(l => l.id === this.saveManager.getSelectedLocation());
                const multiplier = location ? location.coinMultiplier : 1.0;
                this.sessionCoins += Math.floor(1 * multiplier);
                this.audio.play('coin');
            }
        });
        
        // Player vs Hearts
        this.spawner.hearts.forEach(heart => {
            if (this.collision.checkPlayerItem(this.player, heart)) {
                this.player.heal(0.5);
                this.audio.play('heart');
            }
        });
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background
        const location = CONSTANTS.LOCATIONS.find(l => l.id === this.saveManager.getSelectedLocation());
        if (location) {
            const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
            gradient.addColorStop(0, location.bgTop);
            gradient.addColorStop(1, location.bgBottom);
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        // Draw ground
        this.ctx.fillStyle = '#4CAF50';
        this.ctx.fillRect(0, CONSTANTS.GROUND_Y, this.canvas.width, this.canvas.height - CONSTANTS.GROUND_Y);
        
        // Draw grass top
        this.ctx.fillStyle = '#66BB6A';
        this.ctx.fillRect(0, CONSTANTS.GROUND_Y, this.canvas.width, 20);
        
        // Draw pits
        this.ctx.fillStyle = '#3E2723';
        this.spawner.pits.forEach(pit => {
            this.ctx.fillRect(pit.x, CONSTANTS.GROUND_Y, pit.width, this.canvas.height - CONSTANTS.GROUND_Y);
        });
        
        // Draw coins
        this.spawner.coins.forEach(coin => coin.draw(this.ctx));
        
        // Draw hearts
        this.spawner.hearts.forEach(heart => heart.draw(this.ctx));
        
        // Draw enemies
        this.spawner.enemies.forEach(enemy => {
            if (!enemy.isDead) {
                enemy.draw(this.ctx);
            }
        });
        
        // Draw player
        this.player.draw(this.ctx);
    }
    
    gameLoop(timestamp) {
        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        
        // Cap delta time to prevent huge jumps
        const cappedDelta = Math.min(deltaTime, 0.1);
        
        this.update(cappedDelta);
        this.draw();
        
        requestAnimationFrame((t) => this.gameLoop(t));
    }
}

export default Game;
