# 🎮 GAME DESIGN DOCUMENT (GDD)
## **Funny Baxi: Run and Jump**

**Version:** 1.0 (Final)  
**Date:** 2026  
**Platform:** Web (HTML5), Yandex Games  
**Genre:** 2D Endless Runner / Platformer  
**Target Audience:** Kids 6+, Casual Players  
**Stack:** HTML5 / CSS3 / Vanilla JS (ES6 Modules)

---

## 📋 TABLE OF CONTENTS

1. [HIGH CONCEPT](#1-high-concept)
2. [CORE GAMEPLAY](#2-core-gameplay)
3. [CONTROLS & INPUT](#3-controls--input)
4. [VISUAL STYLE & ASSETS](#4-visual-style--assets)
5. [CONTENT & PROGRESSION](#5-content--progression)
6. [TECHNICAL SPECIFICATIONS](#6-technical-specifications)
7. [SCOPE & PRIORITIES](#7-scope--priorities)

---

## 1. HIGH CONCEPT

| Parameter | Value |
| :--- | :--- |
| **Title (EN)** | **Funny Baxi: Run and Jump** |
| **Title (RU)** | **Весёлый Бакси: Беги и Прыгай** |
| **Genre** | 2D Endless Runner / Platformer |
| **One-liner** | A dynamic run of a toothy monster Baxi through a fantasy world, jumping over pits and defeating funny enemies with a head-stomp attack. |
| **Target Audience** | Kids 6+, Casual Players (Hyper-casual / Casual) |
| **Platforms** | Web (HTML5), Yandex Games (SDK), Mobile/PC Browsers |
| **Session Length** | 2-3 min (run), 15-20 min (total app time) |
| **Monetization** | Yandex SDK: Interstitial (after death), Rewarded Video (continue) |

---

## 2. CORE GAMEPLAY

### 2.1. Primary Mechanics

| Action | Description |
| :--- | :--- |
| **Run** | Character runs automatically left-to-right (background scrolls left). |
| **Jump** | Player presses input → Character jumps. |
| **Attack (Butt Slam)** | If input is pressed **in air above enemy** → Fall acceleration + "Big Butt" animation + "Pop" sound. |
| **Run Sound** | Periodic phrase: "Yum-yum tap-tap-tap" (funny voice, every 3-7 sec). |
| **Coin Collection** | On collect: Chewing sound + Coin counter increment. |

### 2.2. Health System (HP)

| Parameter | Value |
| :--- | :--- |
| **Health** | 3 Hearts (displayed in HUD) |
| **Damage** | 0.5 Hearts per hit (enemy side/bottom, spikes, pit) |
| **Invulnerability** | 1 second after damage (character blinking) |
| **Game Over** | When HP = 0 |

### 2.3. Gameplay Loop

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   MENU      │ ──→ │   RUN       │ ──→ │   DEATH     │
│ (Select Skin)│     │ (Run, Jump) │     │ (Ads)       │
└─────────────┘     └─────────────┘     └─────────────┘
       ↑                                       │
       └───────────────────────────────────────┘
                    (Retry / Menu)
```

### 2.4. Win/Loss Conditions

| Condition | Result |
| :--- | :--- |
| **Loss** | HP = 0 (enemy side/bottom hit, spikes, pit) |
| **Win** | None (Endless Runner). **High Score** tracking. |
| **Progress** | Score per distance + Coins per collect + Location Bonus |

---

## 3. CONTROLS & INPUT

### 3.1. Input Scheme

| Action | PC (Keyboard) | PC (Mouse) | Mobile (Touch) |
| :--- | :--- | :--- | :--- |
| **Jump / Attack** | `Space`, `ArrowUp`, `KeyW` (any layout) | `Click` (LMB) | `TouchStart` (anywhere) |
| **Pause** | `Escape`, `P`, `KeyP` | — | UI Button (always visible) |
| **UI Click** | `Click` | `Click` | `TouchEnd` |

### 3.2. Pause System

| Type | Implementation |
| :--- | :--- |
| **Button** | Always visible, top-right, min. 44x44 px |
| **Keys** | `ESC`, `P` (toggle pause) |
| **Auto-Pause** | On tab blur (`visibilitychange` event) |
| **Pause Menu** | Resume (P/ESC), Menu, Settings (Audio) |

### 3.3. UX for Kids (6+)

- Visual hint on first launch (blinking hand/arrow).
- Full screen area is active for jump (except UI buttons).
- Large UI buttons (min. 44x44 px for mobile touch targets).

---

## 4. VISUAL STYLE & ASSETS

### 4.1. Art Style & Sprite Specs

| Element | Style | **Sprite Size (px)** |
| :--- | :--- | :--- |
| **Character (Baxi)** | 2D Cartoon Chibi (fluffy, soft shapes, big eyes) | **64x64** |
| **Enemies** | Same style, caricature evil features | **48x48** |
| **Background** | 2D Vector with Parallax (2-3 layers) | Scalable |
| **UI** | Flat design, large buttons, bright icons, rounded shapes | **48x48 (Icons)** |
| **Items (Coin/Heart)** | Simple, bright | **32x32** |
| **Obstacles (Spikes)** | Low profile | **48x32** |

**Note:** All sprites should be packed into **Sprite Sheets (512x512 px)** for optimal WebGL batching.

### 4.2. Typography & Colors

| Parameter | Value |
| :--- | :--- |
| **Primary Font** | **Google Fonts "Fredoka One"** (Rounded, playful) |
| **Fallback Font** | "Nunito", sans-serif |
| **UI Text** | 24px (Mobile), 28px (PC) |
| **HUD Text** | 32px (Large, visible during gameplay) |
| **Game Over Text** | 48px (Header), 32px (Stats) |
| **Text Color** | `#333333` (Dark) on light bg, `#FFFFFF` on dark bg |

**Color Palette:**

| Element | Color | HEX | Note |
| :--- | :--- | :--- | :--- |
| **Baxi (Main)** | Electric Blue | `#4A9FFF` | Default |
| **Baxi (Alt)** | Pink, Green, Orange | — | Shop Unlock |
| **Enemies** | Orange/Red | `#FF6B35` | Contrast to bg |
| **Coins** | Pink/Purple | `#D65DB1` | + Gold Sparkle `#FFD700` |
| **Bg (Garden)** | Mint/Green | `#98E8C1` | Start Location |
| **Bg (Cave)** | Purple | `#9B59B6` | Shop Unlock |
| **UI Buttons** | Yellow/Orange | `#FFC107` | Text `#333333` |

### 4.3. Locations & Progression

| Location | Status | Price | Coin Bonus | Enemies |
| :--- | :--- | :--- | :--- | :--- |
| **Magic Garden** | 🟢 Open | Free | x1.0 | Carrot, Tomato |
| **Sweet Cave** | 🔒 Locked | 500 Coins | x1.5 | + Candy Golem |
| **Night Forest** | 🔒 Locked | 1000 Coins | x2.0 | + Owl Ghost |

**Mechanic:** Farm coins in Garden → Save for Location → New Location gives more coins → Unlock skins faster.

### 4.4. Audio System

| Requirement | Implementation |
| :--- | :--- |
| **Stop on Minimize** | `visibilitychange` → `audioContext.suspend()` |
| **Resume** | Only after user interaction (click/tap) |
| **Settings** | 2 Sliders: **Music Volume** / **SFX Volume** |
| **Save Volume** | LocalStorage + Yandex SDK `player.setData()` |

---

## 5. CONTENT & PROGRESSION

### 5.1. Game Objects & Animation Specs

| Object | Type | Effect | **Animation Duration** | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Baxi** | Player | Jump, Attack Top | **Run: 0.6s (6 frames)** | [MVP] |
| **Carrot** | Enemy | Dmg on hit, Die on jump | **Idle: 0.5s** | [MVP] |
| **Tomato** | Enemy | Walk/Roll, Dmg on hit | **Roll: 0.3s** | [MVP] |
| **Coin** | Currency | +1 Coin (Spawn 6 pcs) | **Collect: 0.2s** | [MVP] |
| **Heart** | Bonus | +0.5 HP (max 3) | **Pulse: 1.0s** | [MVP] |
| **Pit** | Obstacle | Instant Death | — | [MVP] |
| **Spikes** | Obstacle | Dmg on hit | — | [MVP] |

**Specific Animations:**
- **Jump:** 0.5 sec (5 frames)
- **Attack (Butt Slam):** 0.3 sec (3 frames)
- **Damage:** 0.4 sec (4 frames, blinking)
- **Death:** 0.5 sec (5 frames)

### 5.2. Coin Spawning

| Parameter | Value |
| :--- | :--- |
| **Quantity** | 6 coins per spawn event |
| **Pattern 1** | **Arc in Air** (Requires jumping to collect) |
| **Pattern 2** | **Line on Ground** (Run and collect) |
| **Frequency** | Every 10-15 seconds |
| **Location Bonus** | x1.5 / x2.0 applied per coin |

### 5.3. Difficulty Progression

| Parameter | Value |
| :--- | :--- |
| **Base Speed** | 100% (configurable) |
| **Speed Increase** | **+5% every 30 seconds** (No cap) |
| **Enemy Spawn** | Every 2-4 sec (decreases with speed) |
| **Coin Spawn** | Every 10-15 sec (groups of 6) |
| **Heart Spawn** | Every 60-90 sec (rare) |
| **Theoretical Max** | Game becomes unbeatable ~5-7 min into run |

### 5.4. Skins (Shop)

| Skins | Price | Description |
| :--- | :--- | :--- |
| **Blue Baxi** | Free | Default |
| **Pink Baxi** | 200 Coins | Alt Color |
| **Green Baxi** | 400 Coins | Alt Color |
| **Orange Baxi** | 600 Coins | Alt Color |

### 5.5. Game Over Screen

| Element | Display |
| :--- | :--- |
| **Run Score** | XXXX (Large) |
| **Coins Earned** | XXX (with icon) |
| **Best Record** | BEST: XXXX |
| **Buttons** | "Retry", "Menu", "Continue for Ad" |

---

## 6. TECHNICAL SPECIFICATIONS

### 6.1. Resolution & Display

| Parameter | Value |
| :--- | :--- |
| **Base Canvas Resolution** | 1280x720 (Internal, for performance) |
| **Min Supported** | 320x480 (Old phones) |
| **Max Supported** | **Unlimited** (2K, 4K, Ultrawide — CSS Scaling) |
| **Scaling** | CSS `transform: scale()` + `object-fit: contain` |
| **Orientation** | **Portrait + Landscape** (Adaptive Camera) |

### 6.2. Orientation Handling

| Orientation | Settings |
| :--- | :--- |
| **Landscape** | Standard speed, standard FOV |
| **Portrait** | Camera Zoomed Out (-15%), Speed -10% |
| **Screen Rotate** | Recalculate dimensions on `resize` event |

### 6.3. Project Structure (Feature-Based)

```
/game
├── index.html
├── /css
│   └── style.css
├── /js
│   ├── main.js                 (Entry point, ES6 module)
│   ├── /core
│   │   ├── game.js             (Game Loop)
│   │   ├── constants.js        (Config, Balance)
│   │   └── utils.js            (Helpers)
│   ├── /entities
│   │   ├── player.js
│   │   ├── /enemies
│   │   │   ├── base-enemy.js
│   │   │   ├── carrot.js
│   │   │   └── tomato.js
│   │   └── /items
│   │       ├── coin.js
│   │       └── heart.js
│   ├── /systems
│   │   ├── collision.js
│   │   ├── spawner.js
│   │   └── difficulty.js
│   ├── /ui
│   │   ├── menu.js
│   │   ├── hud.js
│   │   ├── pause.js
│   │   └── gameover.js
│   ├── /audio
│   │   └── audio-manager.js
│   ├── /save
│   │   └── save-manager.js
│   ├── /shop
│   │   └── shop.js
│   └── /platform
│       └── yandex.js
└── /assets
    ├── /sprites
    └── /audio
```

**Total:** ~20 JS files, organized by feature.

### 6.4. Modules & Import

| Parameter | Value |
| :--- | :--- |
| **Module Type** | **ES6 Modules** (`import` / `export`) |
| **Integration** | `<script type="module" src="js/main.js">` |
| **Requirement** | Local server required for dev (Live Server) |

### 6.5. Asset Weight & Audio

| Type | Limit | Our Target |
| :--- | :--- | :--- |
| **Total Weight** | 100 MB (Yandex Max) | **10-20 MB** |
| **Sprites (PNG)** | — | 5-8 MB (TinyPNG compression) |
| **Audio Files** | — | 2-4 MB |
| **Audio Format** | **Music: MP3 (128kbps)** <br> **SFX: OGG + MP3 (64kbps)** |
| **Code (JS/CSS)** | — | <1 MB |
| **Load Time (3G)** | — | <5 seconds |

### 6.6. Save & Data

| System | Purpose |
| :--- | :--- |
| **LocalStorage** | Settings (Volume, Language) |
| **Yandex SDK `player.setData()`** | Progress (Coins, Skins, Locations, Records) |
| **Fallback** | LocalStorage if SDK unavailable |

### 6.7. Performance

| Platform | Requirement |
| :--- | :--- |
| **PC** | 60 FPS (Stable) |
| **Mobile** | 30+ FPS (Drops allowed on old devices) |
| **Code Limit** | **~150 lines per file** (Modularity) |
| **Function Limit** | **~30 lines per function** |
| **File Count** | ~20 JS files (Organized in folders) |

### 6.8. Yandex Games Requirements

| Requirement | Implementation |
| :--- | :--- |
| **SDK Integration** | `ysdk.js` in `<head>` |
| **Ads** | Interstitial (Between scenes), Rewarded (Continue) |
| **Pause on Minimize** | `visibilitychange` → `audioContext.suspend()` |
| **Age Rating** | 0+ (No violence, no inappropriate content) |
| **Languages** | RU (Primary), EN (Optional) |

---

## 7. SCOPE & PRIORITIES

### 7.1. MVP (Minimum Viable Product)

**Must-have for Yandex Games Publication:**

| Category | Features |
| :--- | :--- |
| **Gameplay** | Run, Jump, Butt Slam, 2 Enemies, Coins, Hearts |
| **Content** | 1 Location (Garden), 1 Skin (Blue Baxi) |
| **Systems** | HP (3 Hearts), Difficulty Progression, Coin Spawn (6 pcs) |
| **UI** | Menu, HUD (Score/Coins/HP), Pause, Game Over |
| **Audio** | Music, SFX (Jump, Attack, Collect, Death), 2 Volume Sliders |
| **Yandex SDK** | Integration, Ads (Interstitial + Rewarded), Saves |
| **Technical** | Adaptive (Portrait + Landscape), 60 FPS PC / 30+ FPS Mobile |

**MVP Timeline:** 4-6 weeks (Part-time dev)

---

### 7.2. POST-MVP (Post-Release Updates)

**Add in updates 1.1, 1.2, etc.:**

| Category | Features |
| :--- | :--- |
| **Content** | +2 Locations (Cave, Forest), +3 Skins (Pink, Green, Orange) |
| **Enemies** | Gentleman Mouse (Jump + Glide) |
| **Power-ups** | Shield, Magnet, Double Points |
| **Systems** | Achievements, Daily Quests, Leaderboards |
| **Languages** | EN version for international release |
| **Monetization** | Additional Ad spots (for bonuses) |

---

### 7.3. CUT (Out of Scope)

**Definitely NOT included (Focus on MVP):**

| Feature | Reason |
| :--- | :--- |
| **Multiplayer** | Too complex for Vanilla JS + Not needed for Runner |
| **Boss Fights** | Does not fit Endless Runner genre |
| **Complex Progression** | Skill trees — Overload for Casual 6+ audience |
| **3D Graphics** | Does not fit style + Heavy for Web |
| **PWA / App** | Yandex Games works in WebView — Not needed |

---

### 7.4. DEVELOPMENT ROADMAP

| Week | Task |
| :--- | :--- |
| **1-2** | Project Setup, Core Gameplay (Run, Jump, Collision) |
| **3-4** | Enemies, Spawning, Coins, HP System |
| **5** | UI (Menu, Pause, Game Over), Audio |
| **6** | Shop, Saves, Yandex SDK Integration |
| **7** | Testing, Optimization, Bugfix |
| **8** | Publish to Yandex Games |

---

## ✅ GDD COMPLETE

**Congratulations!** You have a full Game Design Document for **Funny Baxi: Run and Jump**.

### 📌 NEXT STEPS:

1.  **Setup Environment:** Install VS Code + Live Server Extension.
2.  **Create Folder Structure:** Follow Section 6.3.
3.  **Start with `index.html` and `main.js`:** Project entry point.
4.  **Follow Roadmap:** Week 1-2 → Core Gameplay.
5.  **Test on Devices:** PC + Mobile (Real phones).
6.  **Submit to Yandex Games:** After passing all tests.
