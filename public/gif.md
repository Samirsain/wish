# GIF System Plan — Per-Category & Per-Card Unique Animated Effects
## See-Me.co Enhanced Version

**Date:** 7 April 2026  
**Problem:** Currently all cards use the same `sname.gif` (glitter sparkle) for name animation.  
**Solution:** Category-specific + card-specific animated GIF system for name text effects.

---

## 1. How Current System Works

```
CSS:
.sname {
  background: url('sname.gif') repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shake-rotate 0.8s infinite;
}
```
- **ONE GIF** (`sname.gif`) used across ALL cards
- Same glitter sparkle effect everywhere
- Boring & repetitive

---

## 2. New System — Category-Based GIF Mapping

### Folder Structure:
```
/public/gifs/
  /christmas/
    snow-sparkle.gif        ← snowflakes falling
    red-glitter.gif         ← red & green glitter
    gold-christmas.gif      ← golden christmas sparkle
    candy-cane-stripe.gif   ← red-white candy stripe pattern
    frosted-ice.gif         ← icy frost crystal effect
  /new-year/
    fireworks-burst.gif     ← colorful fireworks
    gold-confetti.gif       ← golden confetti falling
    champagne-bubble.gif    ← bubbly golden effect
    midnight-sparkle.gif    ← dark blue + silver sparkle
    neon-glow.gif           ← neon color shifting glow
  /eid/
    emerald-shimmer.gif     ← green & gold shimmer
    crescent-stars.gif      ← moon & stars pattern
    arabic-gold.gif         ← golden arabic pattern
    lantern-glow.gif        ← warm lantern light effect
    jade-sparkle.gif        ← jade green sparkle
  /diwali/
    diya-flame.gif          ← warm flame flicker
    rangoli-colors.gif      ← multicolor rangoli pattern
    saffron-gold.gif        ← saffron & gold sparkle
    firework-burst.gif      ← colorful firework sparks
    lotus-shimmer.gif       ← pink lotus petal shimmer
  /holi/
    color-splash.gif        ← rainbow color splashes
    powder-burst.gif        ← dry color powder explosion
    rainbow-drip.gif        ← dripping rainbow colors
    gulaal-spray.gif        ← pink/red gulaal spray
    watercolor-flow.gif     ← flowing watercolor effect
  /valentine/
    heart-glitter.gif       ← red hearts floating
    rose-petal.gif          ← rose petal falling
    pink-shimmer.gif        ← soft pink shimmer
    love-sparkle.gif        ← red & pink sparkle
    romantic-glow.gif       ← warm romantic soft glow
  /birthday/
    confetti-pop.gif        ← colorful confetti
    balloon-float.gif       ← floating balloons pattern
    cake-sparkle.gif        ← golden cake candle sparkle
    party-glitter.gif       ← multicolor party glitter
    rainbow-burst.gif       ← rainbow burst effect
  /ramadan/
    golden-crescent.gif     ← golden crescent pattern
    mosque-glow.gif         ← warm mosque light glow
    dates-shimmer.gif       ← warm brown & gold shimmer
    starry-night.gif        ← night sky with stars
    green-lantern.gif       ← green lantern glow
  /independence-day/
    tricolor-wave.gif       ← orange-white-green wave
    flag-shimmer.gif        ← tricolor shimmer
    patriot-sparkle.gif     ← saffron & green sparkle
    ashoka-gold.gif         ← navy blue & gold pattern
    freedom-burst.gif       ← tricolor burst
  /mothers-day/
    flower-bloom.gif        ← flowers blooming
    soft-pink-glow.gif      ← gentle pink glow
    garden-shimmer.gif      ← garden flower shimmer
    pearl-shine.gif         ← pearl white shine
    lavender-sparkle.gif    ← lavender purple sparkle
  /fathers-day/
    steel-shine.gif         ← metallic steel shine
    navy-gold.gif           ← navy blue & gold
    classic-shimmer.gif     ← classic elegant shimmer
    wood-grain-glow.gif     ← warm wood texture glow
    silver-spark.gif        ← silver metallic spark
  /friendship-day/
    rainbow-thread.gif      ← rainbow friendship band
    colorful-hearts.gif     ← multicolor hearts
    fun-confetti.gif        ← fun colorful confetti
    emoji-float.gif         ← floating emoji pattern
    neon-friendship.gif     ← neon glow colors
  /thanksgiving/
    autumn-leaves.gif       ← falling autumn leaves
    harvest-gold.gif        ← warm harvest gold
    maple-shimmer.gif       ← red-orange maple shimmer
    pumpkin-glow.gif        ← warm pumpkin orange glow
    gratitude-sparkle.gif   ← warm earth tone sparkle
  /wedding/
    gold-mandala.gif        ← golden mandala pattern
    rose-gold-shimmer.gif   ← rose gold shimmer
    white-lace.gif          ← white lace pattern glow
    diamond-sparkle.gif     ← diamond crystal sparkle
    floral-gold.gif         ← floral golden pattern
  /congratulations/
    trophy-gold.gif         ← golden trophy shine
    star-burst.gif          ← star burst celebration
    champagne-gold.gif      ← champagne golden bubbles
    success-confetti.gif    ← colorful success confetti
    medal-shine.gif         ← medal/badge shine
  /get-well/
    sunshine-glow.gif       ← warm sunshine glow
    gentle-rainbow.gif      ← soft gentle rainbow
    healing-green.gif       ← calming green shimmer
    flower-soft.gif         ← soft flower petal
    warm-light.gif          ← warm healing light
```

---

## 3. Config System — JSON-Based GIF Assignment

### `/data/cards.json` (Master Config)
```json
{
  "categories": {
    "christmas": {
      "name": "Christmas",
      "slug": "xmas",
      "defaultGif": "christmas/red-glitter.gif",
      "accentColor": "#DC2626",
      "cards": [
        {
          "id": 1,
          "title": "Merry Christmas Snowy Night",
          "images": {
            "wish": "xmas/1/wish.webp",
            "main": "xmas/1/main.webp",
            "under": "xmas/1/under.webp"
          },
          "gif": "christmas/snow-sparkle.gif",
          "nameAnimation": "float-down",
          "nameColor": "#FFFFFF"
        },
        {
          "id": 2,
          "title": "Christmas Tree Celebration",
          "images": {
            "wish": "xmas/2/wish.webp",
            "main": "xmas/2/main.webp",
            "under": "xmas/2/under.webp"
          },
          "gif": "christmas/gold-christmas.gif",
          "nameAnimation": "sparkle-in",
          "nameColor": "#FFD700"
        },
        {
          "id": 3,
          "title": "Santa Claus Wishes",
          "images": {
            "wish": "xmas/3/wish.webp",
            "main": "xmas/3/main.webp",
            "under": "xmas/3/under.webp"
          },
          "gif": "christmas/candy-cane-stripe.gif",
          "nameAnimation": "bounce",
          "nameColor": "#FF0000"
        }
      ]
    },
    "eid": {
      "name": "Eid Mubarak",
      "slug": "eid",
      "defaultGif": "eid/emerald-shimmer.gif",
      "accentColor": "#059669",
      "cards": [
        {
          "id": 1,
          "title": "Eid Crescent Moon",
          "gif": "eid/crescent-stars.gif",
          "nameAnimation": "glow-pulse",
          "nameColor": "#FFD700"
        },
        {
          "id": 2,
          "title": "Eid Lantern Night",
          "gif": "eid/lantern-glow.gif",
          "nameAnimation": "warm-fade",
          "nameColor": "#F59E0B"
        }
      ]
    },
    "diwali": {
      "name": "Happy Diwali",
      "slug": "diwali",
      "defaultGif": "diwali/diya-flame.gif",
      "accentColor": "#F59E0B",
      "cards": [
        {
          "id": 1,
          "title": "Diwali Diya Festival",
          "gif": "diwali/diya-flame.gif",
          "nameAnimation": "flame-flicker",
          "nameColor": "#FF6B00"
        },
        {
          "id": 2,
          "title": "Diwali Rangoli",
          "gif": "diwali/rangoli-colors.gif",
          "nameAnimation": "color-shift",
          "nameColor": "#E11D48"
        }
      ]
    },
    "holi": {
      "name": "Happy Holi",
      "slug": "holi",
      "defaultGif": "holi/color-splash.gif",
      "accentColor": "#8B5CF6",
      "cards": [
        {
          "id": 1,
          "title": "Holi Color Splash",
          "gif": "holi/color-splash.gif",
          "nameAnimation": "splash",
          "nameColor": "#7C3AED"
        },
        {
          "id": 2,
          "title": "Holi Gulaal Festival",
          "gif": "holi/gulaal-spray.gif",
          "nameAnimation": "spray-in",
          "nameColor": "#EC4899"
        }
      ]
    },
    "new-year": {
      "name": "Happy New Year",
      "slug": "new-year",
      "defaultGif": "new-year/fireworks-burst.gif",
      "accentColor": "#7C3AED",
      "cards": [
        {
          "id": 1,
          "title": "New Year Fireworks",
          "gif": "new-year/fireworks-burst.gif",
          "nameAnimation": "explode-in",
          "nameColor": "#FFD700"
        },
        {
          "id": 2,
          "title": "New Year Champagne",
          "gif": "new-year/champagne-bubble.gif",
          "nameAnimation": "bubble-up",
          "nameColor": "#F5F5DC"
        }
      ]
    },
    "valentine": {
      "name": "Valentine's Day",
      "slug": "valentine",
      "defaultGif": "valentine/heart-glitter.gif",
      "accentColor": "#E11D48",
      "cards": [
        {
          "id": 1,
          "title": "Valentine Heart",
          "gif": "valentine/heart-glitter.gif",
          "nameAnimation": "heartbeat",
          "nameColor": "#FF1493"
        },
        {
          "id": 2,
          "title": "Rose Petal Love",
          "gif": "valentine/rose-petal.gif",
          "nameAnimation": "petal-fall",
          "nameColor": "#DC143C"
        }
      ]
    },
    "birthday": {
      "name": "Happy Birthday",
      "slug": "birthday",
      "defaultGif": "birthday/confetti-pop.gif",
      "accentColor": "#F97316",
      "cards": [
        {
          "id": 1,
          "title": "Birthday Confetti",
          "gif": "birthday/confetti-pop.gif",
          "nameAnimation": "pop-in",
          "nameColor": "#FF6347"
        },
        {
          "id": 2,
          "title": "Birthday Balloons",
          "gif": "birthday/balloon-float.gif",
          "nameAnimation": "float-up",
          "nameColor": "#4169E1"
        }
      ]
    },
    "ramadan": {
      "name": "Ramadan Kareem",
      "slug": "ramadan",
      "defaultGif": "ramadan/golden-crescent.gif",
      "accentColor": "#854D0E",
      "cards": [
        {
          "id": 1,
          "title": "Ramadan Crescent",
          "gif": "ramadan/golden-crescent.gif",
          "nameAnimation": "moon-glow",
          "nameColor": "#FFD700"
        },
        {
          "id": 2,
          "title": "Ramadan Starry Night",
          "gif": "ramadan/starry-night.gif",
          "nameAnimation": "twinkle",
          "nameColor": "#C0C0C0"
        }
      ]
    },
    "independence-day": {
      "name": "Independence Day",
      "slug": "independence",
      "defaultGif": "independence-day/tricolor-wave.gif",
      "accentColor": "#059669",
      "cards": [
        {
          "id": 1,
          "title": "Tricolor Pride",
          "gif": "independence-day/tricolor-wave.gif",
          "nameAnimation": "wave",
          "nameColor": "#FF9933"
        },
        {
          "id": 2,
          "title": "Freedom Celebration",
          "gif": "independence-day/freedom-burst.gif",
          "nameAnimation": "burst",
          "nameColor": "#138808"
        }
      ]
    },
    "mothers-day": {
      "name": "Mother's Day",
      "slug": "mothers-day",
      "defaultGif": "mothers-day/flower-bloom.gif",
      "accentColor": "#EC4899",
      "cards": [
        {
          "id": 1,
          "title": "Floral Love Mom",
          "gif": "mothers-day/flower-bloom.gif",
          "nameAnimation": "bloom",
          "nameColor": "#FF69B4"
        }
      ]
    },
    "fathers-day": {
      "name": "Father's Day",
      "slug": "fathers-day",
      "defaultGif": "fathers-day/steel-shine.gif",
      "accentColor": "#1E40AF",
      "cards": [
        {
          "id": 1,
          "title": "Classic Dad",
          "gif": "fathers-day/navy-gold.gif",
          "nameAnimation": "engrave",
          "nameColor": "#C0A060"
        }
      ]
    },
    "friendship-day": {
      "name": "Friendship Day",
      "slug": "friendship",
      "defaultGif": "friendship-day/rainbow-thread.gif",
      "accentColor": "#0EA5E9",
      "cards": [
        {
          "id": 1,
          "title": "Friendship Band",
          "gif": "friendship-day/rainbow-thread.gif",
          "nameAnimation": "weave",
          "nameColor": "#FF4500"
        }
      ]
    },
    "thanksgiving": {
      "name": "Thanksgiving",
      "slug": "thanksgiving",
      "defaultGif": "thanksgiving/autumn-leaves.gif",
      "accentColor": "#B45309",
      "cards": [
        {
          "id": 1,
          "title": "Autumn Gratitude",
          "gif": "thanksgiving/autumn-leaves.gif",
          "nameAnimation": "leaf-fall",
          "nameColor": "#CD853F"
        }
      ]
    },
    "wedding": {
      "name": "Wedding Wishes",
      "slug": "wedding",
      "defaultGif": "wedding/gold-mandala.gif",
      "accentColor": "#A16207",
      "cards": [
        {
          "id": 1,
          "title": "Golden Wedding",
          "gif": "wedding/gold-mandala.gif",
          "nameAnimation": "mandala-spin",
          "nameColor": "#DAA520"
        },
        {
          "id": 2,
          "title": "Rose Gold Wedding",
          "gif": "wedding/rose-gold-shimmer.gif",
          "nameAnimation": "shimmer",
          "nameColor": "#B76E79"
        }
      ]
    },
    "congratulations": {
      "name": "Congratulations",
      "slug": "congrats",
      "defaultGif": "congratulations/trophy-gold.gif",
      "accentColor": "#CA8A04",
      "cards": [
        {
          "id": 1,
          "title": "Trophy Achievement",
          "gif": "congratulations/trophy-gold.gif",
          "nameAnimation": "trophy-lift",
          "nameColor": "#FFD700"
        }
      ]
    },
    "get-well": {
      "name": "Get Well Soon",
      "slug": "get-well",
      "defaultGif": "get-well/sunshine-glow.gif",
      "accentColor": "#65A30D",
      "cards": [
        {
          "id": 1,
          "title": "Sunshine Recovery",
          "gif": "get-well/sunshine-glow.gif",
          "nameAnimation": "warm-glow",
          "nameColor": "#FFD700"
        }
      ]
    }
  }
}
```

---

## 4. Per-Card Name Animations (16 Unique Animations)

Each card can have its own animation style — not just `shake-rotate` for all.

```css
/* ===== BASE — Applied to all name text ===== */
.card-name {
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 900;
  font-size: clamp(2rem, 6vw, 4rem);
  text-align: center;
  line-height: 1.2;
}

/* ===== ANIMATION 1: shake-rotate (Original) ===== */
.anim-shake-rotate {
  animation: shake-rotate 0.8s infinite;
}
@keyframes shake-rotate {
  0%   { transform: rotate(0deg); }
  25%  { transform: rotate(2deg); }
  50%  { transform: rotate(0deg); }
  75%  { transform: rotate(-2deg); }
  100% { transform: rotate(0deg); }
}

/* ===== ANIMATION 2: float-down (Snow falling feel) ===== */
.anim-float-down {
  animation: float-down 3s ease-in-out infinite;
}
@keyframes float-down {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(8px); }
}

/* ===== ANIMATION 3: sparkle-in (Fade + scale pulse) ===== */
.anim-sparkle-in {
  animation: sparkle-in 2s ease-in-out infinite;
}
@keyframes sparkle-in {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.85; transform: scale(1.05); }
}

/* ===== ANIMATION 4: bounce ===== */
.anim-bounce {
  animation: name-bounce 1.5s ease infinite;
}
@keyframes name-bounce {
  0%, 100% { transform: translateY(0); }
  30%      { transform: translateY(-12px); }
  50%      { transform: translateY(0); }
  70%      { transform: translateY(-6px); }
}

/* ===== ANIMATION 5: glow-pulse ===== */
.anim-glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}
@keyframes glow-pulse {
  0%, 100% { filter: brightness(1) drop-shadow(0 0 5px rgba(255,215,0,0.3)); }
  50%      { filter: brightness(1.3) drop-shadow(0 0 20px rgba(255,215,0,0.8)); }
}

/* ===== ANIMATION 6: flame-flicker ===== */
.anim-flame-flicker {
  animation: flame-flicker 0.5s ease-in-out infinite alternate;
}
@keyframes flame-flicker {
  0%   { transform: skewX(0deg) scaleY(1); filter: brightness(1); }
  25%  { transform: skewX(1deg) scaleY(1.02); filter: brightness(1.1); }
  50%  { transform: skewX(-0.5deg) scaleY(0.99); filter: brightness(0.95); }
  75%  { transform: skewX(1.5deg) scaleY(1.01); filter: brightness(1.15); }
  100% { transform: skewX(-1deg) scaleY(1); filter: brightness(1.05); }
}

/* ===== ANIMATION 7: color-shift (Holi/Rainbow) ===== */
.anim-color-shift {
  animation: color-shift 4s linear infinite;
}
@keyframes color-shift {
  0%   { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}

/* ===== ANIMATION 8: splash (Burst-in) ===== */
.anim-splash {
  animation: splash 2.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}
@keyframes splash {
  0%, 100% { transform: scale(1) rotate(0deg); }
  25%      { transform: scale(1.1) rotate(2deg); }
  50%      { transform: scale(0.95) rotate(-1deg); }
  75%      { transform: scale(1.05) rotate(1deg); }
}

/* ===== ANIMATION 9: heartbeat (Valentine) ===== */
.anim-heartbeat {
  animation: heartbeat 1.2s ease-in-out infinite;
}
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14%      { transform: scale(1.1); }
  28%      { transform: scale(1); }
  42%      { transform: scale(1.1); }
  70%      { transform: scale(1); }
}

/* ===== ANIMATION 10: pop-in (Birthday) ===== */
.anim-pop-in {
  animation: pop-in 2s ease infinite;
}
@keyframes pop-in {
  0%, 100% { transform: scale(1); }
  10%      { transform: scale(0.9); }
  30%      { transform: scale(1.15); }
  50%      { transform: scale(1); }
}

/* ===== ANIMATION 11: wave (Flag/Independence) ===== */
.anim-wave {
  animation: wave 3s ease-in-out infinite;
}
@keyframes wave {
  0%, 100% { transform: rotate(0deg) skewX(0deg); }
  25%      { transform: rotate(1deg) skewX(2deg); }
  50%      { transform: rotate(-1deg) skewX(-2deg); }
  75%      { transform: rotate(0.5deg) skewX(1deg); }
}

/* ===== ANIMATION 12: bloom (Mother's Day) ===== */
.anim-bloom {
  animation: bloom 3s ease-in-out infinite;
}
@keyframes bloom {
  0%       { transform: scale(0.95); opacity: 0.8; }
  50%      { transform: scale(1.05); opacity: 1; }
  100%     { transform: scale(0.95); opacity: 0.8; }
}

/* ===== ANIMATION 13: engrave (Father's Day — subtle) ===== */
.anim-engrave {
  animation: engrave 4s ease-in-out infinite;
}
@keyframes engrave {
  0%, 100% { letter-spacing: 0.05em; filter: brightness(1); }
  50%      { letter-spacing: 0.12em; filter: brightness(1.2); }
}

/* ===== ANIMATION 14: twinkle (Ramadan/Night) ===== */
.anim-twinkle {
  animation: twinkle 2s ease-in-out infinite;
}
@keyframes twinkle {
  0%, 100% { opacity: 1; text-shadow: 0 0 5px rgba(255,255,255,0.5); }
  50%      { opacity: 0.7; text-shadow: 0 0 20px rgba(255,255,255,1); }
}

/* ===== ANIMATION 15: bubble-up (Champagne/New Year) ===== */
.anim-bubble-up {
  animation: bubble-up 2.5s ease-in-out infinite;
}
@keyframes bubble-up {
  0%, 100% { transform: translateY(0) scale(1); }
  25%      { transform: translateY(-5px) scale(1.02); }
  50%      { transform: translateY(-10px) scale(1.04); }
  75%      { transform: translateY(-5px) scale(1.02); }
}

/* ===== ANIMATION 16: shimmer (Wedding — elegant) ===== */
.anim-shimmer {
  animation: shimmer 3s linear infinite;
  background-size: 200% 100%;
}
@keyframes shimmer {
  0%   { background-position: -100% 0; }
  100% { background-position: 100% 0; }
}
```

---

## 5. Implementation — React/Next.js Component

### `CardName.jsx`
```jsx
import { useEffect, useState } from 'react';

const ANIMATION_MAP = {
  'shake-rotate': 'anim-shake-rotate',
  'float-down': 'anim-float-down',
  'sparkle-in': 'anim-sparkle-in',
  'bounce': 'anim-bounce',
  'glow-pulse': 'anim-glow-pulse',
  'flame-flicker': 'anim-flame-flicker',
  'color-shift': 'anim-color-shift',
  'splash': 'anim-splash',
  'heartbeat': 'anim-heartbeat',
  'pop-in': 'anim-pop-in',
  'wave': 'anim-wave',
  'bloom': 'anim-bloom',
  'engrave': 'anim-engrave',
  'twinkle': 'anim-twinkle',
  'bubble-up': 'anim-bubble-up',
  'shimmer': 'anim-shimmer',
};

export default function CardName({ name, gifPath, animation, nameColor }) {
  const animClass = ANIMATION_MAP[animation] || 'anim-shake-rotate';
  
  return (
    <div className="card-name-wrapper">
      <h1
        className={`card-name ${animClass}`}
        style={{
          backgroundImage: `url(/gifs/${gifPath})`,
          // Fallback color if GIF fails
          color: nameColor || '#FFD700',
        }}
      >
        {name || 'Your Name'}
      </h1>
    </div>
  );
}
```

### `CardRenderer.jsx`
```jsx
import CardName from './CardName';
import cardsData from '@/data/cards.json';

export default function CardRenderer({ categorySlug, cardId, userName }) {
  // Find category
  const category = Object.values(cardsData.categories)
    .find(cat => cat.slug === categorySlug);
  
  if (!category) return <div>Category not found</div>;
  
  // Find card
  const card = category.cards.find(c => c.id === parseInt(cardId));
  if (!card) return <div>Card not found</div>;
  
  // Use card-specific GIF, fallback to category default
  const gifPath = card.gif || category.defaultGif;
  
  return (
    <div className="card-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* Layer 1: Top Wish Banner */}
      <img 
        src={`/images/${card.images.wish}`}
        alt={card.title}
        className="w-full"
      />
      
      {/* Layer 2: Animated Name */}
      <CardName 
        name={userName}
        gifPath={gifPath}
        animation={card.nameAnimation}
        nameColor={card.nameColor}
      />
      
      {/* Layer 3: Main Card Image */}
      <img 
        src={`/images/${card.images.main}`}
        alt={card.title}
        className="w-full -mt-10"
      />
      
      {/* Layer 4: Bottom Decoration */}
      <img 
        src={`/images/${card.images.under}`}
        alt="decoration"
        className="w-full"
      />
    </div>
  );
}
```

---

## 6. How to Create/Add GIFs

### Option A: Create GIFs via CSS (No actual GIF files needed)
```css
/* Pure CSS animated gradient as background-clip text */
.text-gradient-christmas {
  background: linear-gradient(90deg, #ff0000, #00ff00, #FFD700, #ff0000);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-flow 3s linear infinite;
}

.text-gradient-diwali {
  background: linear-gradient(90deg, #FF6B00, #FFD700, #FF4500, #FFA500, #FF6B00);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-flow 2.5s linear infinite;
}

.text-gradient-eid {
  background: linear-gradient(90deg, #059669, #FFD700, #10B981, #F59E0B, #059669);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-flow 3s linear infinite;
}

.text-gradient-holi {
  background: linear-gradient(90deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #8B00FF, #FF0000);
  background-size: 400% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-flow 2s linear infinite;
}

@keyframes gradient-flow {
  0%   { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
```

### Option B: AI-Generated GIF Textures
Use these prompts to generate GIFs:

| Category | AI Prompt for GIF Generation |
|----------|-----|
| Christmas | "Seamless tileable red and green glitter sparkle texture, animated snow particles, loop, 200x200px" |
| Eid | "Seamless tileable emerald green and gold shimmer texture, crescent moon pattern, loop, 200x200px" |
| Diwali | "Seamless tileable warm orange flame flicker texture, golden diya glow, loop, 200x200px" |
| Holi | "Seamless tileable rainbow color powder splash texture, vibrant multicolor, loop, 200x200px" |
| New Year | "Seamless tileable golden firework sparkle texture on dark background, loop, 200x200px" |
| Valentine | "Seamless tileable red hearts with pink glitter texture, romantic sparkle, loop, 200x200px" |
| Birthday | "Seamless tileable colorful confetti falling texture, party celebration, loop, 200x200px" |
| Ramadan | "Seamless tileable golden crescent and stars on dark blue texture, loop, 200x200px" |
| Wedding | "Seamless tileable rose gold and gold mandala pattern texture, elegant shimmer, loop, 200x200px" |

### Option C: Free GIF Resources
- **Giphy Stickers API** (free, transparent backgrounds)
- **LottieFiles** (convert Lottie → GIF for text backgrounds)
- **Pixabay/Pexels** (free texture videos → convert to GIF)
- **Canva** (create seamless pattern GIFs)

---

## 7. GIF Optimization Guidelines

```
Format:     GIF (for background-clip compatibility)
Size:       200x200px (tileable, repeats across text)
Colors:     Max 64 colors per GIF (reduces file size)
Frames:     15-30 frames (smooth but lightweight)
File Size:  Target < 100KB per GIF
Loop:       Infinite loop
Transparency: NOT needed (used as background fill)

Optimization Tools:
- gifsicle --optimize=3 --colors=64 input.gif -o output.gif
- ezgif.com/optimize (online)
- ImageMagick: convert input.gif -layers optimize -colors 64 output.gif
```

---

## 8. Summary — What Changes from Original

| Aspect | Original (See-Me.co) | New System |
|--------|----------------------|------------|
| GIFs | 1 GIF for ALL cards (`sname.gif`) | 75+ unique GIFs across 16 categories |
| Animation | Same `shake-rotate` everywhere | 16 unique name animations |
| Name Color | Same color always | Per-card customized name color |
| Config | Hardcoded in HTML | JSON-driven, easily extensible |
| Categories | 4 categories | 16 categories planned |
| Adding cards | Edit HTML files | Add entry to `cards.json` |
| Fallback | None | Category default GIF if card GIF missing |
| Performance | Unoptimized GIFs | <100KB per GIF, lazy-loaded |

---

## 9. Quick Start — Adding a New Card

```json
// Just add this to cards.json under the right category:
{
  "id": 3,
  "title": "Diwali Fireworks Night",
  "images": {
    "wish": "diwali/3/wish.webp",
    "main": "diwali/3/main.webp",
    "under": "diwali/3/under.webp"
  },
  "gif": "diwali/firework-burst.gif",
  "nameAnimation": "splash",
  "nameColor": "#FFD700"
}
```
That's it! New card with unique GIF and animation — no code changes needed.
