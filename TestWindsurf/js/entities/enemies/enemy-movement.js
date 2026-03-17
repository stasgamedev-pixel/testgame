// Enemy Movement Patterns
// Base movement patterns for all enemy types in Funny Baxi: Run and Jump

/**
 * Straight Movement Pattern
 * Enemy moves in straight line
 */
export function moveStraight(enemy) {
    enemy.velocityX = enemy.speed * enemy.direction;
    enemy.x += enemy.velocityX;
}

/**
 * Patrol Movement Pattern  
 * Enemy moves back and forth within patrol distance
 */
export function movePatrol(enemy) {
    enemy.velocityX = enemy.speed * enemy.direction;
    enemy.x += enemy.velocityX;
    
    // Change direction at boundaries
    const patrolDistance = 200;
    if (Math.abs(enemy.x - enemy.startX) > patrolDistance) {
        enemy.direction *= -1;
        enemy.facingDirection = enemy.direction;
    }
}

/**
 * Sine Wave Movement Pattern
 * Enemy moves in sine wave pattern
 */
export function moveSine(enemy, deltaTime) {
    enemy.velocityX = enemy.speed * enemy.direction;
    enemy.x += enemy.velocityX;
    
    // Add sine wave to Y position
    const amplitude = 50;
    const frequency = 0.002;
    const groundY = enemy.groundY || 500; // Fallback если groundY NaN
    enemy.y = groundY + Math.sin(enemy.x * frequency) * amplitude;
}

/**
 * Update Enemy Physics
 * Apply gravity and ground collision
 */
export function updatePhysics(enemy, deltaTime) {
    // Apply gravity
    if (!enemy.isGrounded) {
        enemy.velocityY += enemy.gravity;
    }
    
    // Update position
    enemy.y += enemy.velocityY;
    
    // Check ground collision
    if (enemy.y >= enemy.groundY) {
        enemy.y = enemy.groundY;
        enemy.velocityY = 0;
        enemy.isGrounded = true;
    }
}

/**
 * Update Movement Based on Pattern
 * Main movement update function
 */
export function updateMovement(enemy, deltaTime) {
    switch (enemy.movePattern) {
        case 'straight':
            moveStraight(enemy);
            break;
        case 'patrol':
            movePatrol(enemy);
            break;
        case 'sine':
            moveSine(enemy, deltaTime);
            break;
    }
    
    // Update physics
    updatePhysics(enemy, deltaTime);
}

/**
 * Change Enemy Direction
 * Flip movement direction
 */
export function changeDirection(enemy) {
    enemy.direction *= -1;
    enemy.facingDirection = enemy.direction;
}

/**
 * Set Enemy Speed
 * Update movement speed
 */
export function setSpeed(enemy, newSpeed) {
    enemy.speed = newSpeed;
}

/**
 * Check if Enemy is at Patrol Boundary
 * Used for patrol pattern logic
 */
export function isAtPatrolBoundary(enemy) {
    const patrolDistance = 200;
    return Math.abs(enemy.x - enemy.startX) > patrolDistance;
}
