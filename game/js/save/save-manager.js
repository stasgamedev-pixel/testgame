/**
 * Save Manager - Handles game progress persistence
 */

import CONSTANTS from '../core/constants.js';

export class SaveManager {
    constructor() {
        this.data = {
            coins: 0,
            bestScore: 0,
            unlockedSkins: ['blue'],
            selectedSkin: 'blue',
            unlockedLocations: ['garden'],
            selectedLocation: 'garden',
            musicVolume: 50,
            sfxVolume: 70
        };
        
        this.yandexSDK = null;
        this.player = null;
    }
    
    initYandexSDK() {
        return new Promise((resolve) => {
            if (window.YaGames) {
                YaGames.init().then(ysdk => {
                    this.yandexSDK = ysdk;
                    return ysdk.getPlayer();
                }).then(player => {
                    this.player = player;
                    if (player) {
                        return player.getData();
                    }
                    return null;
                }).then(data => {
                    if (data) {
                        this.data = { ...this.data, ...data };
                    }
                    resolve(true);
                }).catch(err => {
                    console.warn('Yandex SDK error:', err);
                    this.loadFromLocalStorage();
                    resolve(false);
                });
            } else {
                console.log('Yandex SDK not available');
                this.loadFromLocalStorage();
                resolve(false);
            }
        });
    }
    
    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('funnyBaxiSave');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.data = { ...this.data, ...parsed };
            }
        } catch (e) {
            console.warn('Failed to load from localStorage:', e);
        }
    }
    
    save() {
        // Save to localStorage
        try {
            localStorage.setItem('funnyBaxiSave', JSON.stringify(this.data));
        } catch (e) {
            console.warn('Failed to save to localStorage:', e);
        }
        
        // Save to Yandex Cloud
        if (this.player) {
            this.player.setData(this.data).catch(err => {
                console.warn('Failed to save to Yandex Cloud:', err);
            });
        }
    }
    
    addCoins(amount) {
        this.data.coins += amount;
        this.save();
    }
    
    spendCoins(amount) {
        if (this.data.coins >= amount) {
            this.data.coins -= amount;
            this.save();
            return true;
        }
        return false;
    }
    
    unlockSkin(skinId) {
        if (!this.data.unlockedSkins.includes(skinId)) {
            this.data.unlockedSkins.push(skinId);
            this.save();
        }
    }
    
    selectSkin(skinId) {
        if (this.data.unlockedSkins.includes(skinId)) {
            this.data.selectedSkin = skinId;
            this.save();
        }
    }
    
    unlockLocation(locationId) {
        if (!this.data.unlockedLocations.includes(locationId)) {
            this.data.unlockedLocations.push(locationId);
            this.save();
        }
    }
    
    selectLocation(locationId) {
        if (this.data.unlockedLocations.includes(locationId)) {
            this.data.selectedLocation = locationId;
            this.save();
        }
    }
    
    updateBestScore(score) {
        if (score > this.data.bestScore) {
            this.data.bestScore = score;
            this.save();
        }
    }
    
    getCoins() {
        return this.data.coins;
    }
    
    getBestScore() {
        return this.data.bestScore;
    }
    
    getSelectedSkin() {
        return this.data.selectedSkin;
    }
    
    getSelectedLocation() {
        return this.data.selectedLocation;
    }
    
    getUnlockedSkins() {
        return this.data.unlockedSkins;
    }
    
    getUnlockedLocations() {
        return this.data.unlockedLocations;
    }
    
    getMusicVolume() {
        return this.data.musicVolume;
    }
    
    getSFXVolume() {
        return this.data.sfxVolume;
    }
    
    setMusicVolume(value) {
        this.data.musicVolume = value;
        this.save();
    }
    
    setSFXVolume(value) {
        this.data.sfxVolume = value;
        this.save();
    }
}

export default SaveManager;
