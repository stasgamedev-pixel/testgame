// Time Utilities
// Time-related helper functions for Funny Baxi: Run and Jump

/**
 * Time Utilities
 * Helper functions for time operations
 */
export const TimeUtils = {
    /**
     * Get current timestamp in milliseconds
     */
    now() {
        return performance.now();
    },

    /**
     * Format time as MM:SS
     */
    formatTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    },

    /**
     * Format time as HH:MM:SS
     */
    formatTimeExtended(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    },

    /**
     * Convert milliseconds to seconds
     */
    toSeconds(milliseconds) {
        return milliseconds / 1000;
    },

    /**
     * Convert seconds to milliseconds
     */
    toMilliseconds(seconds) {
        return seconds * 1000;
    }
};
