/**
 * Audio Manager - Handles music and sound effects
 */

export class AudioManager {
    constructor() {
        this.musicVolume = 0.5;
        this.sfxVolume = 0.7;
        this.audioContext = null;
        this.musicElement = null;
        this.initialized = false;
        
        // Sound effect buffers (synthesized)
        this.sounds = {};
    }
    
    init() {
        if (this.initialized) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
            this.createSounds();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }
    
    createSounds() {
        // Create synthesized sounds using Web Audio API
        this.sounds = {
            jump: () => this.playTone(400, 'square', 0.15, -200),
            attack: () => this.playTone(300, 'sawtooth', 0.2, -100),
            coin: () => this.playTone(800, 'sine', 0.1, 0, 0.1, 1200),
            heart: () => this.playTone(600, 'sine', 0.3, 0, 0.15, 800),
            hit: () => this.playTone(150, 'sawtooth', 0.3, -50),
            death: () => this.playTone(200, 'sawtooth', 0.5, -100, 0.3, 100),
            step: () => this.playNoise(0.05)
        };
    }
    
    playTone(freq, type, duration, freqSweep = 0, sweepTime = 0, endFreq = 0) {
        if (!this.audioContext) return;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        
        if (freqSweep !== 0) {
            osc.frequency.exponentialRampToValueAtTime(
                endFreq || freq + freqSweep,
                this.audioContext.currentTime + sweepTime
            );
        }
        
        gain.gain.setValueAtTime(this.sfxVolume * 0.3, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.start();
        osc.stop(this.audioContext.currentTime + duration);
    }
    
    playNoise(duration) {
        if (!this.audioContext) return;
        
        const bufferSize = this.audioContext.sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        
        const gain = this.audioContext.createGain();
        gain.gain.setValueAtTime(this.sfxVolume * 0.1, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        noise.connect(gain);
        gain.connect(this.audioContext.destination);
        
        noise.start();
    }
    
    play(soundName) {
        if (!this.initialized) return;
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    }
    
    setMusicVolume(value) {
        this.musicVolume = value / 100;
    }
    
    setSFXVolume(value) {
        this.sfxVolume = value / 100;
    }
    
    suspend() {
        if (this.audioContext && this.audioContext.state === 'running') {
            this.audioContext.suspend();
        }
    }
    
    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

export default AudioManager;
