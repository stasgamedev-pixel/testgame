// Loading Manager
// Handles asset loading and progress tracking

/**
 * Loading Manager Class
 * Manages asset loading with progress tracking
 */
export class LoadingManager {
    constructor() {
        this.totalAssets = 0;
        this.loadedAssets = 0;
        this.progress = 0;
    }

    /**
     * Update loading progress
     */
    updateProgress() {
        this.progress = this.totalAssets > 0 ? this.loadedAssets / this.totalAssets : 0;
        
        const progressBar = document.querySelector('.loading-progress');
        if (progressBar) {
            progressBar.style.width = `${this.progress * 100}%`;
        }
    }

    /**
     * Register asset for loading
     */
    registerAsset() {
        this.totalAssets++;
    }

    /**
     * Mark asset as loaded
     */
    assetLoaded() {
        this.loadedAssets++;
        this.updateProgress();
    }

    /**
     * Get current progress (0-1)
     */
    getProgress() {
        return this.progress;
    }

    /**
     * Reset loading state
     */
    reset() {
        this.totalAssets = 0;
        this.loadedAssets = 0;
        this.progress = 0;
    }
}
