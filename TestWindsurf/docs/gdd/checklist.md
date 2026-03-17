```markdown
# 🧪 MVP TESTING CHECKLIST

**PROJECT:** Funny Baxi: Run and Jump  
**GDD REFERENCE:** `/docs/gdd/main.md`  
**IMPLEMENTATION:** `/docs/gdd/implementation.md`

---

## 📋 HOW TO USE

- Copy this template for each testing session
- Mark [ ] as [x] when test passes
- Document any bugs in the Issues section
- Do not proceed to next step until all critical tests pass

---

## 🏁 WEEK 1: Project Setup + Core Game Loop

| ID | Test | PC | Mobile | Notes |
|----|------|----|--------|-------|
| 1.1 | Canvas renders correctly | [ ] | [ ] | |
| 1.2 | Viewport meta working (no zoom) | [ ] | [ ] | |
| 1.3 | Game loop runs (requestAnimationFrame) | [ ] | [ ] | |
| 1.4 | DeltaTime calculation accurate | [ ] | [ ] | |
| 1.5 | FPS counter displays | [ ] | [ ] | |
| 1.6 | FPS ~60 on PC | [ ] | — | |
| 1.7 | FPS ~30+ on Mobile | [ ] | [ ] | |
| 1.8 | No console errors | [ ] | [ ] | |
| 1.9 | All files under 150 lines | [ ] | [ ] | |

**Issues:**
```


```

**Tester:** _______________  
**Date:** _______________  
**Status:** [ ] Pass [ ] Fail

---

## 🏁 WEEK 2: Player + Movement + Input System

| ID | Test | PC | Mobile | Notes |
|----|------|----|--------|-------|
| 2.1 | Space key triggers jump | [ ] | — | |
| 2.2 | ArrowUp key triggers jump | [ ] | — | |
| 2.3 | KeyW triggers jump | [ ] | — | |
| 2.4 | Mouse click triggers jump | [ ] | — | |
| 2.5 | Touch anywhere triggers jump | [ ] | [ ] | |
| 2.6 | preventDefault on touch (no scroll) | [ ] | [ ] | |
| 2.7 | Jump physics feel consistent | [ ] | [ ] | |
| 2.8 | No double-jump bug | [ ] | [ ] | |
| 2.9 | Player sprite renders (64x64) | [ ] | [ ] | |
| 2.10 | Jump animation triggers (0.5 sec) | [ ] | [ ] | |
| 2.11 | Works in Landscape mode | [ ] | [ ] | |
| 2.12 | Works in Portrait mode | [ ] | [ ] | |

**Issues:**
```


```

**Tester:** _______________  
**Date:** _______________  
**Status:** [ ] Pass [ ] Fail

---

## 🏁 WEEK 3: Enemies + Collision System

| ID | Test | PC | Mobile | Notes |
|----|------|----|--------|-------|
| 3.1 | Carrot enemy spawns | [ ] | [ ] | |
| 3.2 | Tomato enemy spawns | [ ] | [ ] | |
| 3.3 | Enemy spawn interval (2-4 sec) | [ ] | [ ] | |
| 3.4 | Enemy sprites render (48x48) | [ ] | [ ] | |
| 3.5 | Collision detected (side hit) | [ ] | [ ] | |
| 3.6 | Collision detected (bottom hit) | [ ] | [ ] | |
| 3.7 | Butt-slam kills enemy (from above) | [ ] | [ ] | |
| 3.8 | Enemy death animation plays | [ ] | [ ] | |
| 3.9 | No performance drop (5+ enemies) | [ ] | [ ] | |
| 3.10 | Collision system under 150 lines | [ ] | [ ] | |

**Issues:**
```


```

**Tester:** _______________  
**Date:** _______________  
**Status:** [ ] Pass [ ] Fail

---

## 🏁 WEEK 4: Coins + HP System + Game Over

| ID | Test | PC | Mobile | Notes |
|----|------|----|--------|-------|
| 4.1 | Coins spawn in arc pattern | [ ] | [ ] | |
| 4.2 | Coins spawn in line pattern | [ ] | [ ] | |
| 4.3 | Coin spawn frequency (10-15 sec) | [ ] | [ ] | |
| 4.4 | Coin collection (+1 counter) | [ ] | [ ] | |
| 4.5 | Coin animation plays (0.2 sec) | [ ] | [ ] | |
| 4.6 | Heart spawns (60-90 sec) | [ ] | [ ] | |
| 4.7 | HP system (3 hearts max) | [ ] | [ ] | |
| 4.8 | Damage = 0.5 hearts per hit | [ ] | [ ] | |
| 4.9 | Invulnerability blinking (1 sec) | [ ] | [ ] | |
| 4.10 | Game Over on HP = 0 | [ ] | [ ] | |
| 4.11 | Pit causes instant death | [ ] | [ ] | |
| 4.12 | Spikes cause damage | [ ] | [ ] | |

**Issues:**
```


```

**Tester:** _______________  
**Date:** _______________  
**Status:** [ ] Pass [ ] Fail

---

## 🏁 WEEK 5: UI Systems + Pause

| ID | Test | PC | Mobile | Notes |
|----|------|----|--------|-------|
| 5.1 | HUD displays score | [ ] | [ ] | |
| 5.2 | HUD displays coins | [ ] | [ ] | |
| 5.3 | HUD displays HP (hearts) | [ ] | [ ] | |
| 5.4 | Menu loads on game start | [ ] | [ ] | |
| 5.5 | Pause button visible (top-right) | [ ] | [ ] | |
| 5.6 | Pause button min 44x44 px | [ ] | [ ] | |
| 5.7 | ESC key toggles pause | [ ] | — | |
| 5.8 | P key toggles pause | [ ] | — | |
| 5.9 | Auto-pause on visibilitychange | [ ] | [ ] | |
| 5.10 | Visual hint on first launch | [ ] | [ ] | |
| 5.11 | Fredoka One font loads | [ ] | [ ] | |
| 5.12 | UI works in Landscape | [ ] | [ ] | |
| 5.13 | UI works in Portrait | [ ] | [ ] | |
| 5.14 | All touch targets min 44x44 px | [ ] | [ ] | |

**Issues:**
```


```

**Tester:** _______________  
**Date:** _______________  
**Status:** [ ] Pass [ ] Fail

---

## 🏁 WEEK 6: Audio + Saves + Yandex SDK

| ID | Test | PC | Mobile | Notes |
|----|------|----|--------|-------|
| 6.1 | Music plays on game start | [ ] | [ ] | |
| 6.2 | SFX: Jump sound | [ ] | [ ] | |
| 6.3 | SFX: Attack sound | [ ] | [ ] | |
| 6.4 | SFX: Collect coin sound | [ ] | [ ] | |
| 6.5 | SFX: Death sound | [ ] | [ ] | |
| 6.6 | Music volume slider works | [ ] | [ ] | |
| 6.7 | SFX volume slider works | [ ] | [ ] | |
| 6.8 | Audio suspends on tab switch | [ ] | [ ] | |
| 6.9 | Audio resumes after user interaction | [ ] | [ ] | |
| 6.10 | Settings save to LocalStorage | [ ] | [ ] | |
| 6.11 | Settings load on restart | [ ] | [ ] | |
| 6.12 | Yandex SDK initializes | [ ] | [ ] | |
| 6.13 | Interstitial ad shows on death | [ ] | [ ] | |
| 6.14 | Rewarded ad offers continue | [ ] | [ ] | |
| 6.15 | Yandex player.setData() works | [ ] | [ ] | |
| 6.16 | Fallback to LocalStorage if SDK fails | [ ] | [ ] | |

**Issues:**
```


```

**Tester:** _______________  
**Date:** _______________  
**Status:** [ ] Pass [ ] Fail

---

## 🏁 WEEK 7: Shop + Locations + Polish

| ID | Test | PC | Mobile | Notes |
|----|------|----|--------|-------|
| 7.1 | Shop UI displays skins | [ ] | [ ] | |
| 7.2 | Shop UI displays locations | [ ] | [ ] | |
| 7.3 | Skin purchase deducts coins | [ ] | [ ] | |
| 7.4 | Location purchase deducts coins | [ ] | [ ] | |
| 7.5 | Skins change player color | [ ] | [ ] | |
| 7.6 | Locations unlock after purchase | [ ] | [ ] | |
| 7.7 | Coin multiplier x1.0 (Garden) | [ ] | [ ] | |
| 7.8 | Coin multiplier x1.5 (Cave) | [ ] | [ ] | |
| 7.9 | Coin multiplier x2.0 (Forest) | [ ] | [ ] | |
| 7.10 | Speed increases every 30 sec | [ ] | [ ] | |
| 7.11 | Speed caps at 200% | [ ] | [ ] | |
| 7.12 | Total game weight under 20 MB | [ ] | [ ] | |
| 7.13 | Load time under 5 sec (3G) | [ ] | [ ] | |
| 7.14 | Sprite sheets optimized (512x512) | [ ] | [ ] | |
| 7.15 | Audio compressed (MP3/OGG) | [ ] | [ ] | |

**Issues:**
```


```

**Tester:** _______________  
**Date:** _______________  
**Status:** [ ] Pass [ ] Fail

---

## 🏁 WEEK 8: Final Testing + Publish

| ID | Test | PC | Mobile | Notes |
|----|------|----|--------|-------|
| 8.1 | Chrome (latest) - No errors | [ ] | [ ] | |
| 8.2 | Firefox (latest) - No errors | [ ] | [ ] | |
| 8.3 | Safari (latest) - No errors | [ ] | [ ] | |
| 8.4 | iOS Safari - No errors | [ ] | [ ] | |
| 8.5 | Android Chrome - No errors | [ ] | [ ] | |
| 8.6 | Portrait mode - Playable | [ ] | [ ] | |
| 8.7 | Landscape mode - Playable | [ ] | [ ] | |
| 8.8 | FPS stable 60 (PC) | [ ] | — | |
| 8.9 | FPS stable 30+ (Mobile) | [ ] | [ ] | |
| 8.10 | All ads working correctly | [ ] | [ ] | |
| 8.11 | Saves persist after restart | [ ] | [ ] | |
| 8.12 | Yandex Games submission complete | [ ] | [ ] | |
| 8.13 | Game icon (512x512) created | [ ] | [ ] | |
| 8.14 | Age rating 0+ confirmed | [ ] | [ ] | |
| 8.15 | No console errors in production | [ ] | [ ] | |

**Issues:**
```


```

**Tester:** _______________  
**Date:** _______________  
**Status:** [ ] Pass [ ] Fail

---

## 🐛 BUG TRACKING TEMPLATE

```
**Bug ID:** [Week.Step.Number]
**Severity:** [Critical / Major / Minor]
**Description:** 
**Steps to Reproduce:**
**Expected Result:**
**Actual Result:**
**Device/Browser:**
**Status:** [Open / In Progress / Fixed / Won't Fix]
```

---

## 📊 MVP COMPLETION SUMMARY

| Week | Status | Date Completed | Notes |
|------|--------|----------------|-------|
| Week 1 | [ ] | | |
| Week 2 | [ ] | | |
| Week 3 | [ ] | | |
| Week 4 | [ ] | | |
| Week 5 | [ ] | | |
| Week 6 | [ ] | | |
| Week 7 | [ ] | | |
| Week 8 | [ ] | | |

**MVP Ready for Publish:** [ ] YES [ ] NO  
**Final Approval:** _______________  
**Date:** _______________

---

**VERSION:** 1.0  
**DATE:** 2026
```