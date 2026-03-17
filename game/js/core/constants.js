/**
 * Game Constants and Configuration
 */

export const CONSTANTS = {
    // Canvas
    CANVAS_WIDTH: 1280,
    CANVAS_HEIGHT: 720,
    
    // Physics
    GRAVITY: 1500,
    JUMP_FORCE: -650,
    PLAYER_SPEED: 400,
    GROUND_Y: 550,
    
    // Player
    PLAYER_WIDTH: 64,
    PLAYER_HEIGHT: 64,
    MAX_HP: 3,
    INVINCIBILITY_TIME: 1000, // ms
    
    // Enemies
    ENEMY_WIDTH: 48,
    ENEMY_HEIGHT: 48,
    
    // Items
    COIN_WIDTH: 32,
    COIN_HEIGHT: 32,
    HEART_WIDTH: 32,
    HEART_HEIGHT: 32,
    
    // Spawning
    COIN_SPAWN_INTERVAL_MIN: 10000, // ms
    COIN_SPAWN_INTERVAL_MAX: 15000, // ms
    ENEMY_SPAWN_INTERVAL_MIN: 2000, // ms
    ENEMY_SPAWN_INTERVAL_MAX: 4000, // ms
    HEART_SPAWN_INTERVAL_MIN: 60000, // ms
    HEART_SPAWN_INTERVAL_MAX: 90000, // ms
    COINS_PER_SPAWN: 6,
    
    // Difficulty
    BASE_SPEED: 1.0,
    SPEED_INCREASE_INTERVAL: 30000, // ms
    SPEED_INCREASE_AMOUNT: 0.05, // 5%
    
    // Colors (Skins)
    SKINS: [
        { id: 'blue', name: 'Синий Бакси', color: '#4A9FFF', price: 0 },
        { id: 'pink', name: 'Розовый Бакси', color: '#FF69B4', price: 200 },
        { id: 'green', name: 'Зеленый Бакси', color: '#4CAF50', price: 400 },
        { id: 'orange', name: 'Оранжевый Бакси', color: '#FF9800', price: 600 }
    ],
    
    // Locations
    LOCATIONS: [
        { id: 'garden', name: 'Волшебный сад', bgTop: '#98E8C1', bgBottom: '#4A9FFF', price: 0, coinMultiplier: 1.0 },
        { id: 'cave', name: 'Сладкая пещера', bgTop: '#9B59B6', bgBottom: '#8E44AD', price: 500, coinMultiplier: 1.5 },
        { id: 'forest', name: 'Ночной лес', bgTop: '#2C3E50', bgBottom: '#1A252F', price: 1000, coinMultiplier: 2.0 }
    ],
    
    // UI
    FONT_FAMILY: "'Fredoka One', cursive",
    
    // Game States
    STATE: {
        MENU: 'menu',
        PLAYING: 'playing',
        PAUSED: 'paused',
        GAMEOVER: 'gameover'
    }
};

export default CONSTANTS;
