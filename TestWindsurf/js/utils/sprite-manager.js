// Sprite Manager
// Handles sprite loading and caching for Funny Baxi: Run and Jump

/**
 * Sprite Manager Class
 * Manages loading and caching of game sprites
 */
export class SpriteManager {
    constructor() {
        this.sprites = new Map();
        this.loadingPromises = new Map();
        this.basePath = 'assets/sprites/';
    }

    /**
     * Load sprite from file
     */
    async loadSprite(name, filename) {
        // Check if already loaded
        if (this.sprites.has(name)) {
            return this.sprites.get(name);
        }

        // Check if currently loading
        if (this.loadingPromises.has(name)) {
            return this.loadingPromises.get(name);
        }

        // Start loading
        const loadPromise = this.loadSpriteFromFile(name, filename);
        this.loadingPromises.set(name, loadPromise);

        try {
            const sprite = await loadPromise;
            this.sprites.set(name, sprite);
            this.loadingPromises.delete(name);
            console.log(`📦 Sprite loaded: ${name}`);
            return sprite;
        } catch (error) {
            this.loadingPromises.delete(name);
            console.error(`❌ Failed to load sprite: ${name}`, error);
            throw error;
        }
    }

    /**
     * Load sprite from file (implementation)
     */
    async loadSpriteFromFile(name, filename) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${filename}`));
            img.src = this.basePath + filename;
        });
    }

    /**
     * Get loaded sprite
     */
    getSprite(name) {
        return this.sprites.get(name);
    }

    /**
     * Check if sprite is loaded
     */
    isSpriteLoaded(name) {
        return this.sprites.has(name);
    }

    /**
     * Load multiple sprites
     */
    async loadSprites(spriteMap) {
        const loadPromises = Object.entries(spriteMap).map(([name, filename]) => 
            this.loadSprite(name, filename)
        );
        
        try {
            await Promise.all(loadPromises);
            console.log('✅ All sprites loaded successfully!');
        } catch (error) {
            console.error('❌ Failed to load some sprites:', error);
            throw error;
        }
    }

    /**
     * Clear all sprites
     */
    clear() {
        this.sprites.clear();
        this.loadingPromises.clear();
        console.log('🧹 Sprite cache cleared');
    }

    /**
     * Get loading progress
     */
    getLoadingProgress() {
        const total = this.sprites.size + this.loadingPromises.size;
        const loaded = this.sprites.size;
        return total > 0 ? loaded / total : 0;
    }
}
