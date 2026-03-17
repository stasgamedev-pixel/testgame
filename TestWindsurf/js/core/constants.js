// Core Game Constants
// Basic constants for Funny Baxi: Run and Jump

// Canvas Settings (GDD Section 6.1)
export const CANVAS_WIDTH = 1280;
export const CANVAS_HEIGHT = 720;
export const MIN_CANVAS_WIDTH = 320;
export const MIN_CANVAS_HEIGHT = 480;

// Game Settings (GDD Section 2.1)
export const PLAYER_SPEED = 100;
export const JUMP_FORCE = -15;
export const GRAVITY = 0.8;
export const MAX_FALL_SPEED = 20;

// Player Settings (GDD Section 5.1)
export const PLAYER_SIZE = 64;
export const PLAYER_START_X = 200;
export const PLAYER_START_Y = 400;

// Enemy Settings (GDD Section 5.1)
export const ENEMY_SIZE = 48;
export const ENEMY_SPAWN_INTERVAL = 3000; // 3 seconds
export const ENEMY_SPEED = 2;

// Item Settings (GDD Section 5.2)
export const COIN_SIZE = 32;
export const COIN_SPAWN_INTERVAL = 12000; // 12 seconds
export const COINS_PER_SPAWN = 6;
export const HEART_SIZE = 32;
export const HEART_SPAWN_INTERVAL = 75000; // 75 seconds

// HP System (GDD Section 2.2)
export const MAX_HP = 3;
export const DAMAGE_PER_HIT = 0.5;
export const INVULNERABILITY_TIME = 1000; // 1 second

// Difficulty (GDD Section 5.3)
export const SPEED_INCREASE_INTERVAL = 30000; // 30 seconds
export const SPEED_INCREASE_AMOUNT = 0.05; // 5%
export const MAX_SPEED_MULTIPLIER = 2.0; // 200%

// Animation Durations (GDD Section 5.1)
export const JUMP_ANIMATION_DURATION = 500; // 0.5 seconds
export const ATTACK_ANIMATION_DURATION = 300; // 0.3 seconds
export const DAMAGE_ANIMATION_DURATION = 400; // 0.4 seconds
export const DEATH_ANIMATION_DURATION = 500; // 0.5 seconds
export const COLLECT_ANIMATION_DURATION = 200; // 0.2 seconds

// Animation Frames (GDD Section 5.1)
export const RUN_ANIMATION_FRAMES = 6;
export const RUN_ANIMATION_DURATION = 600; // 0.6 seconds
export const JUMP_ANIMATION_FRAMES = 5;
export const ATTACK_ANIMATION_FRAMES = 3;
export const DAMAGE_ANIMATION_FRAMES = 4;
export const DEATH_ANIMATION_FRAMES = 5;

// Game Loop (GDD Section 6.7)
export const TARGET_FPS = 60;
export const FRAME_TIME = 1000 / 60; // 16.67ms

// Game States
export const GAME_STATES = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'game_over',
    LOADING: 'loading'
};

// Input Actions
export const INPUT_ACTIONS = {
    JUMP: 'jump',
    ATTACK: 'attack',
    PAUSE: 'pause',
    MENU: 'menu',
    RESTART: 'restart'
};

// Directions
export const DIRECTIONS = {
    LEFT: -1,
    RIGHT: 1,
    UP: -1,
    DOWN: 1
};

// Collision Types
export const COLLISION_TYPES = {
    PLAYER: 'player',
    ENEMY: 'enemy',
    COIN: 'coin',
    HEART: 'heart',
    OBSTACLE: 'obstacle'
};
