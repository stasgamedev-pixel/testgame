// Player Animation Module
// Handles player animations and visual effects

/**
 * Player Animation Class
 * Manages player animations and visual transformations
 */
export class PlayerAnimation {
    constructor(player) {
        this.player = player;
        
        // Jump animation
        this.isJumping = false;
        this.jumpAnimationTimer = 0;
        this.jumpAnimationDuration = 500; // 0.5 seconds
        this.jumpAnimationFrame = 0;
        this.jumpAnimationFrames = 5;
    }

    /**
     * Update animations
     */
    update(deltaTime) {
        this.updateJumpAnimation(deltaTime);
    }

    /**
     * Update jump animation
     */
    updateJumpAnimation(deltaTime) {
        if (!this.isJumping) return;
        
        this.jumpAnimationTimer += deltaTime;
        
        // Calculate animation frame
        this.jumpAnimationFrame = Math.floor(
            (this.jumpAnimationTimer / this.jumpAnimationDuration) * this.jumpAnimationFrames
        );
        
        // Check if animation is complete
        if (this.jumpAnimationTimer >= this.jumpAnimationDuration) {
            this.jumpAnimationTimer = 0;
            this.jumpAnimationFrame = 0;
            this.isJumping = false;
        }
    }

    /**
     * Start jump animation
     */
    startJumpAnimation() {
        this.isJumping = true;
        this.jumpAnimationTimer = 0;
        this.jumpAnimationFrame = 0;
    }

    /**
     * Apply jump animation transformation
     */
    applyJumpAnimation(ctx) {
        if (!this.isJumping) return;
        
        const progress = this.jumpAnimationTimer / this.jumpAnimationDuration;
        const frame = this.jumpAnimationFrame;
        
        // Calculate squash and stretch based on animation frame
        let scaleX = 1;
        let scaleY = 1;
        
        if (frame === 0) {
            // Squash before jump
            scaleX = 0.9;
            scaleY = 1.1;
        } else if (frame === 1) {
            // Stretch during jump up
            scaleX = 1.1;
            scaleY = 0.9;
        } else if (frame === 2) {
            // Peak of jump
            scaleX = 1.05;
            scaleY = 0.95;
        } else if (frame === 3) {
            // Start falling
            scaleX = 0.95;
            scaleY = 1.05;
        } else {
            // Recovery
            scaleX = 0.95;
            scaleY = 1.1;
        }
        
        // Apply transformation
        ctx.translate(this.player.x, this.player.y - this.player.height/2);
        ctx.scale(scaleX, scaleY);
        ctx.translate(-this.player.x, -(this.player.y - this.player.height/2));
    }

    /**
     * Apply invulnerability blinking effect
     */
    applyInvulnerabilityEffect(ctx) {
        if (!this.player.health.getIsInvulnerable()) return;
        
        const alpha = this.player.health.getDamageFlashAlpha();
        ctx.globalAlpha = alpha;
    }

    /**
     * Render fallback graphics
     */
    renderFallback(ctx) {
        // Draw player as rectangle with face
        ctx.fillStyle = '#4A9FFF'; // BAXI_BLUE
        ctx.fillRect(
            this.player.x - this.player.width/2, 
            this.player.y - this.player.height, 
            this.player.width, 
            this.player.height
        );
        
        // Draw simple face
        this.renderFace(ctx);
    }

    /**
     * Render player face
     */
    renderFace(ctx) {
        ctx.fillStyle = '#FFFFFF';
        
        // Eyes
        const eyeY = this.player.y - this.player.height + 20;
        ctx.fillRect(this.player.x - 10, eyeY, 8, 8);
        ctx.fillRect(this.player.x + 2, eyeY, 8, 8);
        
        // Mouth
        ctx.fillRect(this.player.x - 8, this.player.y - this.player.height + 35, 16, 3);
    }

    /**
     * Check if jumping animation is active
     */
    getIsJumping() {
        return this.isJumping;
    }

    /**
     * Get current animation frame
     */
    getAnimationFrame() {
        return this.jumpAnimationFrame;
    }

    /**
     * Get animation progress (0-1)
     */
    getAnimationProgress() {
        return this.jumpAnimationTimer / this.jumpAnimationDuration;
    }

    /**
     * Set jump animation duration
     */
    setJumpAnimationDuration(duration) {
        this.jumpAnimationDuration = duration;
    }

    /**
     * Set jump animation frames
     */
    setJumpAnimationFrames(frames) {
        this.jumpAnimationFrames = frames;
    }

    /**
     * Reset animation state
     */
    reset() {
        this.isJumping = false;
        this.jumpAnimationTimer = 0;
        this.jumpAnimationFrame = 0;
    }

    /**
     * Force stop animation
     */
    stopAnimation() {
        this.isJumping = false;
        this.jumpAnimationTimer = 0;
        this.jumpAnimationFrame = 0;
    }

    /**
     * Get animation info for debugging
     */
    getAnimationInfo() {
        return {
            isJumping: this.isJumping,
            frame: this.jumpAnimationFrame,
            progress: this.getAnimationProgress(),
            timer: this.jumpAnimationTimer
        };
    }
}
