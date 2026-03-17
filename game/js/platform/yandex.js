/**
 * Yandex Platform Integration
 */

export class YandexPlatform {
    constructor() {
        this.sdk = null;
        this.player = null;
        this.adShowing = false;
    }
    
    init() {
        return new Promise((resolve) => {
            if (window.YaGames) {
                YaGames.init().then(sdk => {
                    this.sdk = sdk;
                    resolve(true);
                }).catch(err => {
                    console.warn('Yandex SDK init error:', err);
                    resolve(false);
                });
            } else {
                console.log('Yandex SDK not available');
                resolve(false);
            }
        });
    }
    
    async showInterstitial() {
        if (this.adShowing || !this.sdk) return false;
        
        try {
            this.adShowing = true;
            await this.sdk.adv.showFullscreenAdv({
                callbacks: {
                    onClose: () => {
                        this.adShowing = false;
                    },
                    onError: (error) => {
                        console.warn('Ad error:', error);
                        this.adShowing = false;
                    }
                }
            });
            return true;
        } catch (e) {
            console.warn('Failed to show interstitial:', e);
            this.adShowing = false;
            return false;
        }
    }
    
    async showRewardedVideo() {
        if (this.adShowing || !this.sdk) return false;
        
        try {
            this.adShowing = true;
            const result = await this.sdk.adv.showRewardedVideo({
                callbacks: {
                    onOpen: () => {
                        console.log('Rewarded video opened');
                    },
                    onRewarded: () => {
                        console.log('Rewarded!');
                    },
                    onClose: () => {
                        this.adShowing = false;
                    },
                    onError: (error) => {
                        console.warn('Rewarded video error:', error);
                        this.adShowing = false;
                    }
                }
            });
            return result;
        } catch (e) {
            console.warn('Failed to show rewarded video:', e);
            this.adShowing = false;
            return false;
        }
    }
    
    getPlayer() {
        return this.player;
    }
    
    isAvailable() {
        return this.sdk !== null;
    }
}

export default YandexPlatform;
