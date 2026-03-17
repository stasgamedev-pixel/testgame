// Canvas Utilities
// Canvas drawing helper functions for Funny Baxi: Run and Jump

/**
 * Canvas Utilities
 * Helper functions for canvas drawing operations
 */
export const CanvasUtils = {
    /**
     * Clear canvas
     */
    clear(ctx, width, height) {
        ctx.clearRect(0, 0, width, height);
    },

    /**
     * Draw filled rectangle
     */
    fillRect(ctx, x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    },

    /**
     * Draw circle
     */
    drawCircle(ctx, x, y, radius, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    },

    /**
     * Draw text
     */
    drawText(ctx, text, x, y, fontSize, color, font = 'Fredoka One') {
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px ${font}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
    },

    /**
     * Draw centered text
     */
    drawCenteredText(ctx, text, centerX, centerY, fontSize, color) {
        this.drawText(ctx, text, centerX, centerY, fontSize, color);
    },

    /**
     * Draw outlined text
     */
    drawOutlinedText(ctx, text, x, y, fontSize, fillColor, outlineColor, outlineWidth = 2) {
        const font = 'Fredoka One';
        ctx.font = `${fontSize}px ${font}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Draw outline
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = outlineWidth;
        ctx.strokeText(text, x, y);
        
        // Draw fill
        ctx.fillStyle = fillColor;
        ctx.fillText(text, x, y);
    },

    /**
     * Draw rounded rectangle
     */
    drawRoundedRect(ctx, x, y, width, height, radius, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
    }
};
