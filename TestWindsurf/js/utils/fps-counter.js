// FPS Counter
// Frames per second tracking for Funny Baxi: Run and Jump

import { TimeUtils } from './time-utils.js';
import { DebugUtils } from './debug-utils.js';

/**
 * FPS Counter Class
 * Tracks and displays frames per second
 */
export class FPSCounter {
    constructor() {
        this.frameCount = 0;
        this.fps = 0;
        this.lastTime = 0;
        this.updateInterval = 1000; // Update every second
    }

    /**
     * Update FPS counter
     */
    update(currentTime) {
        this.frameCount++;
        
        if (currentTime - this.lastTime >= this.updateInterval) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            DebugUtils.log(`FPS: ${this.fps}`);
        }
    }

    /**
     * Get current FPS
     */
    getFPS() {
        return this.fps;
    }

    /**
     * Reset FPS counter
     */
    reset() {
        this.frameCount = 0;
        this.fps = 0;
        this.lastTime = 0;
    }
}
