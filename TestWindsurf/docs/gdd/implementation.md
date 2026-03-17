```markdown
# 🚀 IMPLEMENTATION GUIDE for SWE 1.5

**PROJECT:** Funny Baxi: Run and Jump  
**GDD REFERENCE:** `/docs/gdd/main.md`  
**RULES:** `/.windsurfrules`

---

## ⚠️ CRITICAL RULES (ALWAYS FOLLOW)

| Rule | Limit | Action if Exceeded |
|------|-------|-------------------|
| Lines per File | MAX 150 | Refactor → Split into modules |
| Lines per Function | MAX 30 | Extract → Create private method |
| Steps per Session | MAX 1 | Stop → Wait for confirmation |
| Test Coverage | PC + Mobile | Checklist before next step |

**Workflow:**
```
ANALYSIS → PLAN → STOP (confirm) → CODE (1 step) → TEST → STOP (confirm)
```

---

## 📅 WEEK 1: Project Setup + Core Game Loop

**Goal:** Working Canvas with game loop running at 60 FPS

| Step | Task | Files | GDD Ref |
|------|------|-------|---------|
| 1.1 | Create folder structure | All folders | 6.3 |
| 1.2 | Create `index.html` with Canvas + viewport meta | `index.html` | 6.1 |
| 1.3 | Create `main.js` entry point with ES6 module | `js/main.js` | 6.4 |
| 1.4 | Create `constants.js` with CONFIG object | `js/core/constants.js` | 6.7 |
| 1.5 | Create `game.js` with requestAnimationFrame loop | `js/core/game.js` | 6.7 |
| 1.6 | Implement deltaTime calculation | `js/core/game.js` | 6.7 |
| 1.7 | Add FPS counter for debugging | `js/core/game.js` | 6.7 |

**Testing Checklist:**
```
[ ] Canvas renders on PC (Chrome, Firefox)
[ ] Canvas renders on Mobile (iOS Safari, Android Chrome)
[ ] FPS counter shows ~60 FPS (PC) / ~30+ FPS (Mobile)
[ ] No console errors
[ ] File sizes under 150 lines each
```

---

## 📅 WEEK 2: Player + Movement + Input System

**Goal:** Player can jump with keyboard, mouse, and touch

| Step | Task | Files | GDD Ref |
|------|------|-------|---------|
| 2.1 | Create `input.js` with Input Manager class | `js/core/input.js` | 3.1 |
| 2.2 | Implement keyboard input (Space, ArrowUp, KeyW) | `js/core/input.js` | 3.1 |
| 2.3 | Implement mouse input (LMB click) | `js/core/input.js` | 3.1 |
| 2.4 | Implement touch input (TouchStart anywhere) | `js/core/input.js` | 3.1 |
| 2.5 | Add preventDefault for touch events | `js/core/input.js` | 3.3 |
| 2.6 | Create `player.js` with Player class | `js/entities/player.js` | 5.1 |
| 2.7 | Implement jump physics (velocity, gravity) | `js/entities/player.js` | 5.1 |
| 2.8 | Add jump animation trigger (0.5 sec, 5 frames) | `js/entities/player.js` | 5.1 |
| 2.9 | Create placeholder sprite (64x64 blue square) | `assets/sprites/` | 4.1 |

**Testing Checklist:**
```
[ ] PC: Space/ArrowUp/W triggers jump
[ ] PC: Mouse click triggers jump
[ ] Mobile: Touch anywhere triggers jump
[ ] Jump height feels consistent
[ ] No double-jump bug
[ ] Input works in Portrait + Landscape
```

---

## 📅 WEEK 3: Enemies + Collision System

**Goal:** Enemies spawn, move, and deal damage on collision

| Step | Task | Files | GDD Ref |
|------|------|-------|---------|
| 3.1 | Create `base-enemy.js` with Enemy base class | `js/entities/enemies/base-enemy.js` | 5.1 |
| 3.2 | Create `carrot.js` extending base enemy | `js/entities/enemies/carrot.js` | 5.1 |
| 3.3 | Create `tomato.js` extending base enemy | `js/entities/enemies/tomato.js` | 5.1 |
| 3.4 | Create `collision.js` with AABB detection | `js/systems/collision.js` | 6.7 |
| 3.5 | Implement player-enemy collision | `js/systems/collision.js` | 2.2 |
| 3.6 | Implement butt-slam attack detection (above enemy) | `js/entities/player.js` | 2.1 |
| 3.7 | Create `spawner.js` for enemy spawning | `js/systems/spawner.js` | 5.3 |
| 3.8 | Implement spawn timing (2-4 sec interval) | `js/systems/spawner.js` | 5.3 |
| 3.9 | Add placeholder enemy sprites (48x48) | `assets/sprites/` | 4.1 |

**Testing Checklist:**
```
[ ] Enemies spawn at correct intervals
[ ] Collision detected on side/bottom hit
[ ] Butt-slam kills enemy (jump from above)
[ ] Enemy sprites render correctly
[ ] No performance drop with 5+ enemies
```

---

## 📅 WEEK 4: Coins + HP System + Game Over

**Goal:** Full core loop with health, coins, and death

| Step | Task | Files | GDD Ref |
|------|------|-------|---------|
| 4.1 | Create `coin.js` with Coin class | `js/entities/items/coin.js` | 5.1 |
| 4.2 | Implement coin spawn patterns (arc + line) | `js/systems/spawner.js` | 5.2 |
| 4.3 | Implement coin collection (+1 coin) | `js/entities/items/coin.js` | 5.2 |
| 4.4 | Create `heart.js` for health pickup | `js/entities/items/heart.js` | 5.1 |
| 4.5 | Implement HP system (3 hearts, 0.5 damage) | `js/entities/player.js` | 2.2 |
| 4.6 | Add invulnerability blinking (1 sec) | `js/entities/player.js` | 2.2 |
| 4.7 | Create `gameover.js` with death screen | `js/ui/gameover.js` | 5.5 |
| 4.8 | Implement Game Over condition (HP = 0) | `js/core/game.js` | 2.4 |
| 4.9 | Add pit/spike obstacles | `js/entities/obstacles.js` | 5.1 |

**Testing Checklist:**
```
[ ] Coins spawn in arcs and lines
[ ] Coin counter increments on collection
[ ] HP decreases on enemy hit (0.5 per hit)
[ ] Player blinks during invulnerability
[ ] Game Over screen shows on HP = 0
[ ] Pit causes instant death
```

---

## 📅 WEEK 5: UI Systems + Pause

**Goal:** Complete UI flow with menu, pause, and HUD

| Step | Task | Files | GDD Ref |
|------|------|-------|---------|
| 5.1 | Create `hud.js` with score/coins/HP display | `js/ui/hud.js` | 5.5 |
| 5.2 | Create `menu.js` with start screen | `js/ui/menu.js` | 7.1 |
| 5.3 | Create `pause.js` with pause menu | `js/ui/pause.js` | 3.2 |
| 5.4 | Implement pause button (44x44 px, top-right) | `js/ui/pause.js` | 3.2 |
| 5.5 | Implement ESC/P key for pause toggle | `js/core/input.js` | 3.2 |
| 5.6 | Implement auto-pause on visibilitychange | `js/core/game.js` | 3.2 |
| 5.7 | Add visual hint for first launch (blinking arrow) | `js/ui/menu.js` | 3.3 |
| 5.8 | Style UI with Fredoka One font | `css/style.css` | 4.2 |

**Testing Checklist:**
```
[ ] HUD shows score, coins, HP correctly
[ ] Menu loads on game start
[ ] Pause button visible (44x44 px minimum)
[ ] ESC/P toggles pause
[ ] Game auto-pauses on tab switch
[ ] UI works in Portrait + Landscape
[ ] Touch targets minimum 44x44 px
```

---

## 📅 WEEK 6: Audio + Saves + Yandex SDK

**Goal:** Full audio system, saves, and SDK integration

| Step | Task | Files | GDD Ref |
|------|------|-------|---------|
| 6.1 | Create `audio-manager.js` with AudioManager class | `js/audio/audio-manager.js` | 4.4 |
| 6.2 | Implement music playback with volume control | `js/audio/audio-manager.js` | 4.4 |
| 6.3 | Implement SFX playback (jump, attack, collect, death) | `js/audio/audio-manager.js` | 4.4 |
| 6.4 | Add audio suspend on visibilitychange | `js/audio/audio-manager.js` | 4.4 |
| 6.5 | Create `save-manager.js` with save/load functions | `js/save/save-manager.js` | 6.6 |
| 6.6 | Implement LocalStorage for settings | `js/save/save-manager.js` | 6.6 |
| 6.7 | Create `yandex.js` with SDK initialization | `js/platform/yandex.js` | 6.8 |
| 6.8 | Implement Yandex SDK player.setData() for progress | `js/platform/yandex.js` | 6.6 |
| 6.9 | Implement Interstitial ad on Game Over | `js/platform/yandex.js` | 6.8 |
| 6.10 | Implement Rewarded ad for Continue | `js/platform/yandex.js` | 6.8 |

**Testing Checklist:**
```
[ ] Music plays on game start
[ ] SFX trigger on actions (jump, collect, etc.)
[ ] Volume sliders work (Music + SFX separate)
[ ] Audio suspends on tab switch
[ ] Audio resumes only after user interaction
[ ] Settings save to LocalStorage
[ ] Yandex SDK initializes without errors
[ ] Interstitial ad shows on death
[ ] Rewarded ad offers continue option
```

---

## 📅 WEEK 7: Shop + Locations + Polish

**Goal:** Shop system, location unlocks, optimization

| Step | Task | Files | GDD Ref |
|------|------|-------|---------|
| 7.1 | Create `shop.js` with Shop class | `js/shop/shop.js` | 5.4 |
| 7.2 | Implement skin purchase with coin deduction | `js/shop/shop.js` | 5.4 |
| 7.3 | Implement location purchase (Garden, Cave, Forest) | `js/shop/shop.js` | 4.3 |
| 7.4 | Add location bonus multiplier (x1.0, x1.5, x2.0) | `js/systems/spawner.js` | 4.3 |
| 7.5 | Implement difficulty progression (+5% speed/30sec) | `js/systems/difficulty.js` | 5.3 |
| 7.6 | Add speed cap (200% max) | `js/systems/difficulty.js` | 5.3 |
| 7.7 | Optimize sprite sheets (512x512) | `assets/sprites/` | 4.1 |
| 7.8 | Compress audio (MP3 128kbps, OGG 64kbps) | `assets/audio/` | 6.5 |
| 7.9 | Add loading screen with progress bar | `js/ui/loading.js` | 6.5 |

**Testing Checklist:**
```
[ ] Shop UI displays skins and locations
[ ] Skins change player color on purchase
[ ] Locations unlock after coin payment
[ ] Coin multiplier applies correctly (x1.5, x2.0)
[ ] Speed increases every 30 seconds
[ ] Speed caps at 200%
[ ] Total game weight under 20 MB
[ ] Load time under 5 seconds on 3G
```

---

## 📅 WEEK 8: Final Testing + Publish

**Goal:** Bug fixes, optimization, Yandex Games submission

| Step | Task | Files | GDD Ref |
|------|------|-------|---------|
| 8.1 | Test on PC (Chrome, Firefox, Safari) | All | 6.7 |
| 8.2 | Test on Mobile (iOS Safari, Android Chrome) | All | 6.7 |
| 8.3 | Test Portrait + Landscape orientation | All | 6.2 |
| 8.4 | Performance profiling (FPS on low-end devices) | All | 6.7 |
| 8.5 | Fix critical bugs from testing | All | — |
| 8.6 | Yandex Games submission checklist | `docs/submission.md` | 6.8 |
| 8.7 | Create game icon (512x512) | `assets/icon.png` | 6.8 |
| 8.8 | Submit to Yandex Games | — | 6.8 |

**Testing Checklist:**
```
[ ] PC: Chrome (latest) - No errors
[ ] PC: Firefox (latest) - No errors
[ ] PC: Safari (latest) - No errors
[ ] Mobile: iOS Safari - No errors
[ ] Mobile: Android Chrome - No errors
[ ] Portrait mode - Playable
[ ] Landscape mode - Playable
[ ] FPS stable 60 (PC) / 30+ (Mobile)
[ ] All ads working correctly
[ ] Saves persist after browser restart
[ ] Yandex Games submission complete
```

---

## 🧪 MASTER TESTING CHECKLIST

**Use after EVERY feature implementation:**

| Category | PC Keyboard | PC Mouse | Mobile Touch | Status |
|----------|-------------|----------|--------------|--------|
| Input | [ ] | [ ] | [ ] | [ ] |
| Visual | [ ] | [ ] | [ ] | [ ] |
| Audio | [ ] | [ ] | [ ] | [ ] |
| UI | [ ] | [ ] | [ ] | [ ] |
| Save/Load | [ ] | [ ] | [ ] | [ ] |
| Orientation | — | — | [ ] Portrait + Landscape | [ ] |

---

## 📞 PROMPT FORMAT FOR SWE 1.5

**Good Prompt:**
```
Week [X], Step [Y]: [Task Name]
Reference: GDD Section [Z.Z]
Files: [list of files to create/modify]
Constraints: MAX 150 lines/file, MAX 30 lines/function
After completion: Provide testing checklist for PC + Mobile
```

**Example:**
```
Week 2, Step 1: Create Input Manager
Reference: GDD Section 3.1
Files: js/core/input.js
Constraints: MAX 150 lines, plan before code
After completion: Testing checklist for keyboard + mouse + touch
```

---

## 🔗 DOCUMENT REFERENCES

| Document | Path |
|----------|------|
| GDD (Main) | `/docs/gdd/main.md` |
| Implementation | `/docs/gdd/implementation.md` |
| Checklist | `/docs/gdd/checklist.md` |
| Rules | `/.windsurfrules` |
| Changelog | `/docs/gdd/changelog.md` |

---

## 📝 SESSION LOG TEMPLATE

```markdown
## Session: [Date]
## Week: [X]
## Steps Completed: [Y.Z]

### Changes:
- [File]: [What changed]

### Testing:
[ ] PC Keyboard
[ ] PC Mouse
[ ] Mobile Touch
[ ] Portrait/Landscape

### Issues:
- [Any bugs or problems]

### Next Session:
- [What to do next]
```

---

## ⚠️ TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| File exceeds 150 lines | Split into sub-modules |
| AI forgets context | Remind: "Reference @/docs/gdd/main.md Section X.X" |
| AI rushes multiple steps | Remind: "Stop after this step. Wait for confirmation." |
| Mobile bugs | Test on real device, not just emulator |
| FPS drops on mobile | Reduce sprite count, optimize collision checks |
| Yandex SDK errors | Check SDK version, verify initialization order |

---

## 🎯 MVP DEFINITION

| Category | Required Features |
|----------|------------------|
| Gameplay | Run, Jump, Butt Slam, 2 Enemies, Coins, Hearts |
| Content | 1 Location (Garden), 1 Skin (Blue Baxi) |
| Systems | HP (3 Hearts), Difficulty Progression, Coin Spawn |
| UI | Menu, HUD, Pause, Game Over |
| Audio | Music, SFX, Volume Sliders |
| SDK | Yandex Integration, Interstitial + Rewarded Ads |
| Technical | Adaptive (Portrait + Landscape), 60 FPS PC / 30+ FPS Mobile |

---

## ✅ FIRST PROMPT TO START

```
I'm starting development of "Funny Baxi: Run and Jump".

Project Documents:
- GDD: @/docs/gdd/main.md
- Implementation Guide: @/docs/gdd/implementation.md
- Rules: @/.windsurfrules

Start with Week 1, Step 1.1: Create folder structure.
Follow .windsurfrules: MAX 150 lines/file, plan before code.
After completion: Provide testing checklist.
```

---

**VERSION:** 1.0  
**DATE:** 2026
```