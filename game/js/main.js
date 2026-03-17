/**
 * Main Entry Point - Funny Baxi: Run and Jump
 */

import Game from './core/game.js';

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init().then(() => {
        console.log('Game initialized successfully!');
    }).catch(err => {
        console.error('Failed to initialize game:', err);
    });
});
