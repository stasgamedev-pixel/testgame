// Collision Detection Utilities
// Collision detection helper functions for Funny Baxi: Run and Jump

/**
 * Collision Detection Utilities
 * Helper functions for collision detection
 */
export const CollisionUtils = {
    /**
     * AABB (Axis-Aligned Bounding Box) collision detection
     */
    AABB(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    },

    /**
     * Check if point is inside rectangle
     */
    pointInRect(point, rect) {
        return point.x >= rect.x &&
               point.x <= rect.x + rect.width &&
               point.y >= rect.y &&
               point.y <= rect.y + rect.height;
    },

    /**
     * Get collision rectangle from position and size
     */
    getRect(x, y, width, height) {
        return {
            x: x,
            y: y,
            width: width,
            height: height
        };
    },

    /**
     * Check if two circles collide
     */
    circleCollision(circle1, circle2) {
        const dx = circle1.x - circle2.x;
        const dy = circle1.y - circle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < circle1.radius + circle2.radius;
    },

    /**
     * Check if point is inside circle
     */
    pointInCircle(point, circle) {
        const dx = point.x - circle.x;
        const dy = point.y - circle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= circle.radius;
    },

    /**
     * Get collision side for platformer games
     */
    getCollisionSide(rect1, rect2) {
        const dx = (rect1.x + rect1.width / 2) - (rect2.x + rect2.width / 2);
        const dy = (rect1.y + rect1.height / 2) - (rect2.y + rect2.height / 2);
        
        const width = (rect1.width + rect2.width) / 2;
        const height = (rect1.height + rect2.height) / 2;
        
        const crossWidth = width * dy;
        const crossHeight = height * dx;
        
        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
            if (crossWidth > crossHeight) {
                if (crossWidth > -crossHeight) {
                    return 'bottom';
                } else {
                    return 'left';
                }
            } else {
                if (crossWidth > -crossHeight) {
                    return 'right';
                } else {
                    return 'top';
                }
            }
        }
        
        return 'none';
    }
};
