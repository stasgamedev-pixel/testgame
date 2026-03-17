// Input Manager
// Unified input handling for Funny Baxi: Run and Jump

import { INPUT, INPUT_ACTIONS } from './game-config.js';
import { DebugUtils } from '../utils/debug-utils.js';

export class InputManager {
    constructor() {
        this.keys = new Set();
        this.touches = new Map();
        this.mousePressed = false;
        this.mousePosition = { x: 0, y: 0 };
        this.actions = new Set();
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        document.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this));
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });

        this.isInitialized = true;
        DebugUtils.log('Input manager initialized');
    }

    destroy() {
        if (!this.isInitialized) return;

        document.removeEventListener('keydown', this.handleKeyDown.bind(this));
        document.removeEventListener('keyup', this.handleKeyUp.bind(this));
        document.removeEventListener('mousedown', this.handleMouseDown.bind(this));
        document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
        document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        document.removeEventListener('touchstart', this.handleTouchStart.bind(this));
        document.removeEventListener('touchend', this.handleTouchEnd.bind(this));
        document.removeEventListener('touchmove', this.handleTouchMove.bind(this));

        this.isInitialized = false;
        DebugUtils.log('Input manager destroyed');
    }

    handleKeyDown(event) {
        this.keys.add(event.code);
        this.updateActions();
        
        if (INPUT.JUMP_KEYS.includes(event.code)) {
            event.preventDefault();
        }
    }

    handleKeyUp(event) {
        this.keys.delete(event.code);
        this.updateActions();
    }

    handleMouseDown(event) {
        if (event.button === 0) {
            this.mousePressed = true;
            this.actions.add(INPUT_ACTIONS.JUMP);
            event.preventDefault();
        }
    }

    handleMouseUp(event) {
        if (event.button === 0) {
            this.mousePressed = false;
            this.actions.delete(INPUT_ACTIONS.JUMP);
        }
    }

    handleMouseMove(event) {
        this.mousePosition.x = event.clientX;
        this.mousePosition.y = event.clientY;
    }

    handleTouchStart(event) {
        event.preventDefault();
        
        for (let i = 0; i < event.changedTouches.length; i++) {
            const touch = event.changedTouches[i];
            this.touches.set(touch.identifier, {
                x: touch.clientX,
                y: touch.clientY,
                startX: touch.clientX,
                startY: touch.clientY
            });
        }

        this.actions.add(INPUT_ACTIONS.JUMP);
    }

    handleTouchEnd(event) {
        for (let i = 0; i < event.changedTouches.length; i++) {
            const touch = event.changedTouches[i];
            this.touches.delete(touch.identifier);
        }

        if (this.touches.size === 0) {
            this.actions.delete(INPUT_ACTIONS.JUMP);
        }
    }

    handleTouchMove(event) {
        event.preventDefault();
        
        for (let i = 0; i < event.changedTouches.length; i++) {
            const touch = event.changedTouches[i];
            const existingTouch = this.touches.get(touch.identifier);
            
            if (existingTouch) {
                existingTouch.x = touch.clientX;
                existingTouch.y = touch.clientY;
            }
        }
    }

    updateActions() {
        this.actions.clear();

        for (const key of INPUT.JUMP_KEYS) {
            if (this.keys.has(key)) {
                this.actions.add(INPUT_ACTIONS.JUMP);
                break;
            }
        }

        for (const key of INPUT.PAUSE_KEYS) {
            if (this.keys.has(key)) {
                this.actions.add(INPUT_ACTIONS.PAUSE);
                break;
            }
        }
    }

    isActionActive(action) {
        return this.actions.has(action);
    }

    isKeyPressed(keyCode) {
        return this.keys.has(keyCode);
    }

    getMousePosition() {
        return { ...this.mousePosition };
    }

    isMousePressed() {
        return this.mousePressed;
    }

    getTouches() {
        return Array.from(this.touches.values());
    }

    getTouch(identifier) {
        return this.touches.get(identifier);
    }

    clear() {
        this.keys.clear();
        this.touches.clear();
        this.mousePressed = false;
        this.actions.clear();
        DebugUtils.log('Input state cleared');
    }

    getActiveActions() {
        return Array.from(this.actions);
    }
}
