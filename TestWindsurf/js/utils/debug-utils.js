// Debug Utilities
// Debug helper functions for Funny Baxi: Run and Jump

import { TimeUtils } from './time-utils.js';

// Debug flag
const DEBUG = false;

/**
 * Debug Utilities
 * Helper functions for debugging
 */
export const DebugUtils = {
    /**
     * Log debug message with timestamp
     */
    log(message, ...args) {
        if (DEBUG) {
            console.log(`[${TimeUtils.formatTime(TimeUtils.now())}] ${message}`, ...args);
        }
    },

    /**
     * Log warning with timestamp
     */
    warn(message, ...args) {
        if (DEBUG) {
            console.warn(`[${TimeUtils.formatTime(TimeUtils.now())}] ${message}`, ...args);
        }
    },

    /**
     * Log error with timestamp
     */
    error(message, ...args) {
        console.error(`[${TimeUtils.formatTime(TimeUtils.now())}] ${message}`, ...args);
    },

    /**
     * Log group start
     */
    group(label) {
        if (DEBUG) {
            console.group(label);
        }
    },

    /**
     * Log group end
     */
    groupEnd() {
        if (DEBUG) {
            console.groupEnd();
        }
    },

    /**
     * Draw debug rectangle on canvas
     */
    drawDebugRect(ctx, x, y, width, height, color = 'red') {
        if (DEBUG) {
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height);
        }
    },

    /**
     * Draw debug circle on canvas
     */
    drawDebugCircle(ctx, x, y, radius, color = 'red') {
        if (DEBUG) {
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    },

    /**
     * Draw debug point on canvas
     */
    drawDebugPoint(ctx, x, y, color = 'red', size = 4) {
        if (DEBUG) {
            ctx.fillStyle = color;
            ctx.fillRect(x - size/2, y - size/2, size, size);
        }
    }
};
