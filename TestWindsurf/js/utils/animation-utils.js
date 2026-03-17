// Animation Utilities
// Animation helper functions for Funny Baxi: Run and Jump

/**
 * Animation Utilities
 * Helper functions for animations
 */
export const AnimationUtils = {
    /**
     * Ease-in-out function
     */
    easeInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },

    /**
     * Ease-out function
     */
    easeOut(t) {
        return 1 - Math.pow(1 - t, 3);
    },

    /**
     * Ease-in function
     */
    easeIn(t) {
        return t * t * t;
    },

    /**
     * Ease-out-quad function
     */
    easeOutQuad(t) {
        return t * (2 - t);
    },

    /**
     * Ease-in-quad function
     */
    easeInQuad(t) {
        return t * t;
    },

    /**
     * Bounce function
     */
    bounce(t) {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (t < 1 / d1) {
            return n1 * t * t;
        } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
    },

    /**
     * Elastic function
     */
    elastic(t) {
        return t === 0 ? 0 : t === 1 ? 1 : 
            -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3));
    }
};
