// Enemy Animation System
// Base animation system for all enemy types in Funny Baxi: Run and Jump

/**
 * Update Animation Timer and Frame
 * Handles basic animation timing
 */
export function updateAnimation(enemy, deltaTime) {
    enemy.animationTimer += deltaTime;
    
    if (enemy.animationTimer >= enemy.animationSpeed) {
        enemy.animationTimer = 0;
        enemy.animationFrame = (enemy.animationFrame + 1) % 2; // Simple 2-frame animation
    }
}

/**
 * Apply Death Animation
 * Fade out and scale down when dying
 */
export function applyDeathAnimation(ctx, enemy) {
    const progress = enemy.deathTimer / enemy.deathDuration;
    
    // Fade out
    ctx.globalAlpha = 1 - progress;
    
    // Scale down
    const scale = 1 - progress * 0.5;
    ctx.translate(enemy.x, enemy.y - enemy.height/2);
    ctx.scale(scale, scale);
    ctx.translate(-enemy.x, -(enemy.y - enemy.height/2));
}

/**
 * Flip Enemy Direction
 * Mirror sprite based on facing direction
 */
export function flipDirection(ctx, enemy) {
    if (enemy.facingDirection === -1) {
        ctx.translate(enemy.x, enemy.y - enemy.height/2);
        ctx.scale(-1, 1);
        ctx.translate(-enemy.x, -(enemy.y - enemy.height/2));
    }
}

/**
 * Render Enemy Face (Base)
 * Default face for enemies (can be overridden)
 */
export function renderFace(ctx, enemy) {
    ctx.fillStyle = '#FFFFFF';
    
    // Eyes
    const eyeY = enemy.y - enemy.height + 15;
    ctx.fillRect(enemy.x - 12, eyeY, 6, 6);
    ctx.fillRect(enemy.x + 6, eyeY, 6, 6);
    
    // Angry mouth
    ctx.fillRect(enemy.x - 8, enemy.y - enemy.height + 30, 16, 3);
}

/**
 * Render Enemy Body
 * Basic rectangle rendering (fallback)
 */
export function renderBody(ctx, enemy) {
    console.log('🎮 Rendering enemy body:', enemy.x, enemy.y, enemy.width, enemy.height, enemy.color);
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x - enemy.width/2, enemy.y - enemy.height, enemy.width, enemy.height);
}

/**
 * Main Render Function
 * Complete enemy rendering with animations
 */
export function render(ctx, enemy) {
    ctx.save();
    
    // Apply death animation
    if (enemy.isDying) {
        applyDeathAnimation(ctx, enemy);
    }
    
    // Flip sprite based on facing direction
    flipDirection(ctx, enemy);
    
    // Render enemy body
    renderBody(ctx, enemy);
    
    // Render enemy face
    renderFace(ctx, enemy);
    
    ctx.restore();
}

/**
 * Update Death Animation
 * Handle death timer and cleanup
 */
export function updateDeathAnimation(enemy, deltaTime) {
    enemy.deathTimer += deltaTime;
    
    if (enemy.deathTimer >= enemy.deathDuration) {
        enemy.destroy();
    }
}

/**
 * Set Animation Speed
 * Change animation frame rate
 */
export function setAnimationSpeed(enemy, speed) {
    enemy.animationSpeed = speed;
}

/**
 * Reset Animation
 * Reset animation to first frame
 */
export function resetAnimation(enemy) {
    enemy.animationTimer = 0;
    enemy.animationFrame = 0;
}

/**
 * Check if Animation is Playing
 * Returns true if enemy is animating
 */
export function isAnimating(enemy) {
    return enemy.isDying || enemy.animationTimer > 0;
}
