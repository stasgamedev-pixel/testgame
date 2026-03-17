/**
 * Shop System - Manages skins and locations
 */

import CONSTANTS from '../core/constants.js';

export class Shop {
    constructor(saveManager, uiManager) {
        this.saveManager = saveManager;
        this.uiManager = uiManager;
    }
    
    render() {
        const shopCoins = document.getElementById('shop-coin-count');
        const skinsGrid = document.getElementById('skins-grid');
        
        if (shopCoins) {
            shopCoins.textContent = this.saveManager.getCoins();
        }
        
        if (skinsGrid) {
            skinsGrid.innerHTML = '';
            
            CONSTANTS.SKINS.forEach(skin => {
                const skinItem = document.createElement('div');
                const isUnlocked = this.saveManager.getUnlockedSkins().includes(skin.id);
                const isSelected = this.saveManager.getSelectedSkin() === skin.id;
                
                skinItem.className = `skin-item ${isSelected ? 'selected' : ''} ${!isUnlocked ? 'locked' : ''}`;
                
                skinItem.innerHTML = `
                    <div class="skin-preview" style="background: ${skin.color}"></div>
                    <div class="skin-name">${skin.name}</div>
                    <div class="skin-price">${isUnlocked ? (isSelected ? 'Выбрано' : 'Куплено') : '🪙 ' + skin.price}</div>
                `;
                
                skinItem.addEventListener('click', () => this.handleSkinClick(skin));
                skinsGrid.appendChild(skinItem);
            });
        }
    }
    
    handleSkinClick(skin) {
        const isUnlocked = this.saveManager.getUnlockedSkins().includes(skin.id);
        
        if (isUnlocked) {
            this.saveManager.selectSkin(skin.id);
            this.render();
        } else {
            if (this.saveManager.spendCoins(skin.price)) {
                this.saveManager.unlockSkin(skin.id);
                this.saveManager.selectSkin(skin.id);
                this.render();
            }
        }
    }
    
    show() {
        this.render();
        this.uiManager.showScreen('shop-screen');
    }
}

export default Shop;
