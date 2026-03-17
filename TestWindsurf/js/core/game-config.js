// Game Configuration
// Game-specific configuration for Funny Baxi: Run and Jump

// Colors (GDD Section 4.2)
export const COLORS = {
    BAXI_BLUE: '#4A9FFF',
    ENEMY_ORANGE: '#FF6B35',
    CARROT_ORANGE: '#FF8C00',
    TOMATO_RED: '#FF6B35',
    BACKGROUND_GREEN: '#98E8C1',
    UI_YELLOW: '#FFC107',
    TEXT_DARK: '#333333',
    TEXT_LIGHT: '#FFFFFF',
    COIN_PURPLE: '#D65DB1',
    HEART_RED: '#E91E63'
};

// Locations (GDD Section 4.3)
export const LOCATIONS = {
    GARDEN: {
        name: 'Magic Garden',
        coinMultiplier: 1.0,
        bgColor: '#98E8C1',
        unlocked: true,
        price: 0
    },
    CAVE: {
        name: 'Sweet Cave',
        coinMultiplier: 1.5,
        bgColor: '#9B59B6',
        unlocked: false,
        price: 500
    },
    FOREST: {
        name: 'Night Forest',
        coinMultiplier: 2.0,
        bgColor: '#2C3E50',
        unlocked: false,
        price: 1000
    }
};

// Skins (GDD Section 5.4)
export const SKINS = {
    BLUE: {
        name: 'Blue Baxi',
        color: '#4A9FFF',
        unlocked: true,
        price: 0
    },
    PINK: {
        name: 'Pink Baxi',
        color: '#FF69B4',
        unlocked: false,
        price: 200
    },
    GREEN: {
        name: 'Green Baxi',
        color: '#4CAF50',
        unlocked: false,
        price: 400
    },
    ORANGE: {
        name: 'Orange Baxi',
        color: '#FF8C00',
        unlocked: false,
        price: 600
    }
};

// Audio Settings (GDD Section 4.4)
export const AUDIO = {
    MUSIC_VOLUME: 0.7,
    SFX_VOLUME: 0.8,
    MUSIC_FORMAT: 'mp3',
    SFX_FORMAT: 'ogg'
};

// Input Settings (GDD Section 3.1)
export const INPUT = {
    JUMP_KEYS: ['Space', 'ArrowUp', 'KeyW'],
    PAUSE_KEYS: ['Escape', 'KeyP'],
    TOUCH_ACTION: 'none'
};

// Input Actions (GDD Section 3.1)
export const INPUT_ACTIONS = {
    JUMP: 'jump',
    PAUSE: 'pause',
    MENU: 'menu',
    RESTART: 'restart'
};

// Performance (GDD Section 6.7)
export const PERFORMANCE = {
    MAX_SPRITES_PER_FRAME: 100,
    MAX_ENEMIES: 10,
    MAX_COINS: 50,
    PARTICLE_LIMIT: 200
};
