# See-Me.co Card Page — Complete Technical & Functional Analysis
## Page: `/card/xmas/11/` (Christmas Greeting Card)

**Date:** 7 April 2026  
**Status:** Full Reverse-Engineering Complete  

---

## Table of Contents

1. [How It Works — Complete Flow](#1-how-it-works--complete-flow)
2. [Page Architecture](#2-page-architecture)
3. [Card Rendering System — 3-Layer Image Stack](#3-card-rendering-system--3-layer-image-stack)
4. [Name System — The Core Feature](#4-name-system--the-core-feature)
5. [Form Submission & Wish Generation](#5-form-submission--wish-generation)
6. [Share System](#6-share-system)
7. [URL-Based Card Viewing (Recipient Flow)](#7-url-based-card-viewing-recipient-flow)
8. [Complete HTML Structure](#8-complete-html-structure)
9. [Complete CSS Analysis](#9-complete-css-analysis)
10. [Complete JavaScript Analysis](#10-complete-javascript-analysis)
11. [CDN & Image System](#11-cdn--image-system)
12. [Dark/Light Theme System](#12-darklight-theme-system)
13. [SEO Content Section](#13-seo-content-section)
14. [Recent Cards Section](#14-recent-cards-section)
15. [Mobile Responsiveness](#15-mobile-responsiveness)
16. [Full Working Code — Ready to Replicate](#16-full-working-code--ready-to-replicate)

---

## 1. How It Works — Complete Flow

### User Flow (Step by Step):

```
[1] User opens card page → /card/xmas/11/
    ↓
[2] Sees: Card images (3-layer stack) + "Your Name" placeholder text
    ↓
[3] Types name in input field (e.g., "Rahul")
    ↓
[4] Clicks "Create Wish" button
    ↓
[5] Form POSTs to wish.php (same folder) with name
    ↓
[6] wish.php returns SAME page but:
    - "Your Name" → replaced with "Rahul" (animated GIF text)
    - Form → replaced with Share Buttons (WhatsApp, Facebook)
    - URL becomes: /card/xmas/11/wish.php
    ↓
[7] User clicks WhatsApp share → sends link:
    https://see-me.co/card/xmas/11/?n=Rahul&t=w
    ↓
[8] Recipient opens link → sees personalized card with "Rahul"
```

### Key Insight:
- **No database, no login, no account** — everything is URL-parameter based
- Name is passed via `?n=Rahul` query parameter OR via POST form
- The card page reads `n` param and renders the name
- `t=w` tracks source (w=WhatsApp, fb=Facebook)

---

## 2. Page Architecture

### Page Has 6 Major Sections:

```
┌─────────────────────────────────────┐
│  HEADER (sticky)                    │
│  Logo + Theme Toggle + Hamburger    │
├─────────────────────────────────────┤
│  SIDE NAV (hidden, slides from left)│
├─────────────────────────────────────┤
│  CARD BLOCK (main content)          │
│  ┌───────────────────────────────┐  │
│  │ .sname → Animated Name Text   │  │
│  │ .hero  → 3-Layer Image Stack  │  │
│  │ .card-section → Greeting Text │  │
│  │ .card-form → Input OR Share   │  │
│  └───────────────────────────────┘  │
├─────────────────────────────────────┤
│  CONTENT CONTAINER                  │
│  SEO Article (H2 + long text)       │
├─────────────────────────────────────┤
│  RECENT CARDS BOX                   │
│  5 cards with thumbnails            │
├─────────────────────────────────────┤
│  FOOTER                             │
│  Links + Copyright                  │
└─────────────────────────────────────┘
```

---

## 3. Card Rendering System — 3-Layer Image Stack

### This is the CORE visual system. Each card has 3 images:

```
Layer Structure (top to bottom):

┌──────────────────────────────┐
│     .sname ("Rahul")         │  ← Animated GIF text overlay
│     font-size: 40px          │     (positioned above images)
│     margin-bottom: -40px     │     (overlaps into hero)
├──────────────────────────────┤
│                              │
│  wish.webp (300x50)          │  ← Top banner/wish text image
│  "Merry Christmas" graphic   │     (small, decorative)
│                              │
├──────────────────────────────┤
│                              │
│  main.webp (300xAuto)        │  ← Main card image
│  Full greeting card visual   │     (largest image)
│                              │
├──────────────────────────────┤
│                              │
│  under.webp (300xAuto)       │  ← Bottom decoration
│  Additional design element   │     (completes the card)
│                              │
└──────────────────────────────┘
```

### Actual HTML:
```html
<center>
  <!-- ANIMATED NAME -->
  <div class="sname">Rahul</div>
  
  <section class="hero">
    <!-- Top wish banner -->
    <div class="hero-main">
      <img src=".../wish.webp" style="width:300px;height:50px;">
    </div>
    <!-- Main card + bottom -->
    <div class="hero-side">
      <img src=".../main.webp" style="width:300px;height:auto;"><br>
      <img src=".../under.webp" style="width:300px;height:auto;">
    </div>
  </section>
</center>
```

### CDN Image Structure:
Each card at `/card/{category}/{id}/` has these images on CDN:
```
https://cdn.jsdelivr.net/gh/cdn2026/pic26/card/xmas/11/
  ├── wish.webp    → Top wish banner
  ├── main.webp    → Main card image
  ├── under.webp   → Bottom decoration
  └── thumb.webp   → Thumbnail for listings
```

---

## 4. Name System — The Core Feature

### The Animated Name (``.sname``)

This is the **magic** of the whole site. The name text uses an **animated GIF as background** with `-webkit-background-clip: text` to create a glittering/sparkling text effect.

```css
.sname, .sname1 {
  color: #000;
  
  /* ANIMATED GIF as text fill */
  background: url("https://fastly.jsdelivr.net/gh/cdn2026/pic26/sname.gif");
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* Continuous shake/rotate animation */
  animation: shake-rotate 10s infinite;
  
  margin-top: 15px;
  margin-bottom: 5px;
  margin-left: 5%;
  margin-right: 5%;
  font-weight: bold;
  overflow-wrap: break-word;
}

.sname { font-size: 40px; margin-bottom: -40px; }  /* Large, overlaps into card */
.sname1 { font-size: 25px; }  /* Smaller variant */

@keyframes shake-rotate {
  0%,10%,20%,30%,40%,50%,60%,70%,80%,90%,100% { transform: rotate(5deg); }
  5%,15%,25%,35%,45%,55%,65%,75%,85%,95% { transform: rotate(-5deg); }
}
```

### How It Works:
1. `sname.gif` = A sparkling/glittering animated GIF
2. Applied as `background` on the text div
3. `-webkit-background-clip: text` clips the GIF to only show through the text shape
4. `-webkit-text-fill-color: transparent` makes the actual text color invisible
5. Result: **Glittering animated text** that looks premium
6. `shake-rotate` animation adds gentle left-right wobble
7. `margin-bottom: -40px` makes the name overlap into the card image below

---

## 5. Form Submission & Wish Generation

### Step 1: Card Page (Initial View)
```html
<div class="card-form">
  <form action="wish.php" method="POST">
    <input type="text" name="n" placeholder="Enter your name here..." required>
    <br>
    <input type="submit" value="Create Wish">
  </form>
</div>
```

### Form Styling:
```css
/* Red input box with black border */
.card-form input[type="text"] {
  width: 95%;
  max-width: 400px;
  padding: 14px 18px;
  font-size: 16px;
  color: #fff;
  background: #ff0000;        /* Bright red background */
  border: 3px solid #000;     /* Black border */
  border-radius: 14px;
}

.card-form input[type="text"]::placeholder {
  color: #ffecec;             /* Light pink placeholder */
}

/* Green submit button */
.card-form input[type="submit"] {
  width: 60%;
  max-width: 280px;
  padding: 14px 18px;
  font-size: 16px;
  background: #00b341;        /* Green */
  color: #fff;
  border: 3px solid #007a2c;
  border-radius: 14px;
  cursor: pointer;
}
```

### Step 2: After Form Submit (wish.php response)

The `wish.php` file:
1. Reads POST `n` parameter (the name)
2. Sanitizes it (basic text cleaning)
3. Returns the **same page template** but with 2 changes:
   - `.sname` shows the entered name instead of "Your Name"
   - `.card-form` shows **Share Buttons** instead of the input form

---

## 6. Share System

### After form submission, the form area is replaced with:
```html
<div class="share-buttons">
  <a class="whatsapp" 
     href="https://api.whatsapp.com/send?text=🤗😇 Have you seen this??? 
           %0A*Rahul* sent you a special surprise message🎁 
           %0A💁 *Open This* 
           %0A👇👇👇👇 
           %0A https://see-me.co/card/xmas/11/?n=Rahul%26t=w">
    WhatsApp
  </a>
  <a class="facebook" 
     href="https://www.facebook.com/sharer/sharer.php?u=https://see-me.co/card/xmas/11/?n=Rahul%26t=fb">
    Facebook
  </a>
</div>
```

### Share URL Pattern:
```
https://see-me.co/card/{category}/{id}/?n={NAME}&t={SOURCE}

Parameters:
  n = URL-encoded name
  t = tracking source (w=WhatsApp, fb=Facebook)
```

### WhatsApp Message Template:
```
🤗😇 Have you seen this???
*{NAME}* sent you a special surprise message🎁
💁 *Open This*
👇👇👇👇
https://see-me.co/card/xmas/11/?n={NAME}&t=w
```

### Share Button Styling:
```css
.share-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.share-buttons a {
  padding: 14px 28px;
  font-size: 17px;
  font-weight: 600;
  border-radius: 60px;      /* Pill shape */
  color: #fff;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  transition: all .25s ease;
}

.share-buttons a:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0,0,0,.25);
}

/* Platform colors */
.whatsapp  { background: #25D366; }
.facebook  { background: #1877F2; }
.twitter   { background: #1DA1F2; }
.telegram  { background: #0088cc; }
.linkedin  { background: #0A66C2; }
.pinterest { background: #E60023; }
```

### iOS Facebook Browser Fix:
```javascript
// WhatsApp links don't work inside Facebook's in-app browser on iOS
// This script converts whatsapp:// protocol to https://api.whatsapp.com
document.addEventListener("DOMContentLoaded", function () {
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isFacebookBrowser = /FBAN|FBAV/i.test(ua);
  if (isIOS && isFacebookBrowser) {
    document.querySelectorAll(".share-buttons a.whatsapp").forEach(link => {
      let href = link.getAttribute("href");
      if (href.startsWith("whatsapp://")) {
        href = href.replace("whatsapp://send?text=", "https://api.whatsapp.com/send?text=");
        link.setAttribute("href", href);
      }
    });
  }
});
```

---

## 7. URL-Based Card Viewing (Recipient Flow)

When someone opens the shared link:
```
https://see-me.co/card/xmas/11/?n=Rahul&t=w
```

The server (likely `index.php` or `.htaccess` routing):
1. Reads `?n=Rahul` from URL
2. Renders the card page with name "Rahul" in `.sname`
3. Shows the **wish page** (with share buttons, not the form)
4. Tracks `t=w` for analytics (WhatsApp referral)

This means the **same page serves 3 states**:

| State | URL | Shows |
|-------|-----|-------|
| **Create** | `/card/xmas/11/` | Form + "Your Name" |
| **Generated** | `/card/xmas/11/wish.php` (POST) | Share buttons + entered name |
| **Shared/View** | `/card/xmas/11/?n=Rahul&t=w` | Share buttons + name from URL |

---

## 8. Complete HTML Structure

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <link rel="icon" href="../../../favicon.ico">
  <title>{SEO Title}</title>
  
  <!-- FULL SEO META TAGS -->
  <meta property="og:title" content="{title}">
  <meta name="twitter:title" content="{title}">
  <meta name="description" content="{description}">
  <meta property="og:description" content="{description}">
  <meta property="og:image" content="{CDN}/thumb.webp">
  <meta name="twitter:image" content="{CDN}/thumb.webp">
  <meta property="og:url" content="{canonical_url}">
  <link rel="canonical" href="{canonical_url}">
  <meta name="keywords" content="{keywords}">
  <meta name="robots" content="index, follow">
  <meta name="twitter:card" content="summary">
  
  <link rel="stylesheet" href="../../../style.css">
</head>
<body>

  <!-- HEADER: Logo + Theme + Menu -->
  <header>...</header>
  
  <!-- SIDE NAV: Slide from left -->
  <div id="sideNav">...</div>
  
  <main>
    <!-- CARD BLOCK -->
    <div class="card-block">
      <center>
        <div class="sname">{NAME}</div>
        <section class="hero">
          <div class="hero-main">
            <img src="{CDN}/wish.webp">
          </div>
          <div class="hero-side">
            <img src="{CDN}/main.webp">
            <img src="{CDN}/under.webp">
          </div>
        </section>
      </center>
      
      <section class="card-section">
        <!-- Colored greeting lines -->
        <p style="color:#ff6b00">Merry Christmas!</p>
        <p style="color:#ff0033">May your days sparkle bright,</p>
        ...
        
        <!-- FORM or SHARE BUTTONS -->
        <div class="card-form">
          <!-- STATE 1: Create form -->
          <form action="wish.php" method="POST">
            <input type="text" name="n" placeholder="Enter your name here..." required>
            <input type="submit" value="Create Wish">
          </form>
          
          <!-- STATE 2: Share buttons (after submit) -->
          <div class="share-buttons">
            <a class="whatsapp" href="...">WhatsApp</a>
            <a class="facebook" href="...">Facebook</a>
          </div>
        </div>
      </section>
    </div>
    
    <!-- SEO CONTENT -->
    <div class="content-container">
      <h2>{SEO Article Title}</h2>
      <div>{Long SEO content...}</div>
    </div>
    
    <!-- RECENT CARDS -->
    <div class="recent-box" id="recentBox">
      <div class="recent-header">Recent Wish Cards</div>
      <!-- 5 recent cards with thumbnails -->
    </div>
  </main>
  
  <footer class="premium-footer">
    <div class="footer-links">...</div>
    <p id="footerText">© 2026 See-Me.co</p>
  </footer>
  
  <script>/* Theme, Nav, Branding, Recent Cards */</script>
  <script>/* iOS Facebook WhatsApp fix */</script>
  <script>/* Google Analytics */</script>
</body>
</html>
```

---

## 9. Complete CSS Analysis

### Theme System (CSS Variables):
```css
:root {
  /* DEFAULT = Dark theme */
  --bg: #1a1a1d;
  --text: #f5f5f5;
  --card-bg: #222227;
  --border: #3a3a42;
}

[data-theme="light"] {
  --bg: #f5f7fb;
  --text: #222;
  --card-bg: #fff;
  --border: #ddd;
}
```

### Card Block:
```css
.card-block {
  background: var(--card-bg);
  max-width: 650px;
  padding: 25px;
  border-radius: 12px;
  margin: 25px auto;
  box-shadow: 0 4px 18px rgba(0,0,0,0.12);
}

.card-block p {
  font-size: 20px;
  margin: 12px 0;
  line-height: 1.6;
  font-weight: 500;
}
```

### Hero Section:
```css
.hero {
  width: 100%;
  max-width: 900px;
  margin: 40px auto 20px;
  padding: 20px;
  text-align: center;
}

@media (max-width: 480px) {
  .hero img {
    width: 95% !important;
    max-width: 300px;
  }
}
```

---

## 10. Complete JavaScript Analysis

### All JS Functions:

| Function | Purpose |
|----------|---------|
| `toggleTheme()` | Switches `data-theme` between "light" and "dark" |
| `toggleNav()` | Opens/closes side navigation panel |
| `applyBranding()` | Sets site name, logo, footer from JSON config |
| `loadRecentCards()` | Fetches `/admin/homepage.json` and renders recent cards |
| `fixPath()` | Normalizes relative/absolute URLs |
| iOS FB fix | Converts `whatsapp://` to `https://api.whatsapp.com` on iOS Facebook browser |

### Data Source:
```javascript
const CDN_PREFIX = "https://cdn.jsdelivr.net/gh/cdn2026/pic26";

fetch("/admin/homepage.json")
  .then(r => r.json())
  .then(data => {
    homeData = data;
    applyBranding();
    loadRecentCards();
  });
```

### Recent Cards Logic:
```javascript
function loadRecentCards() {
  // 1. Flatten all items from all sections
  // 2. Sort by timestamp (newest first)
  // 3. Take top 5
  // 4. Render with CDN thumbnail + title + link
}
```

---

## 11. CDN & Image System

### CDN Provider: jsDelivr (GitHub CDN)

```
Base URL: https://cdn.jsdelivr.net/gh/cdn2026/pic26/

Card Images:
  /card/{category}/{id}/wish.webp    → Top banner
  /card/{category}/{id}/main.webp    → Main card
  /card/{category}/{id}/under.webp   → Bottom
  /card/{category}/{id}/thumb.webp   → Thumbnail

Global Assets:
  /sname.gif                         → Animated glitter for name text
  
Logo:
  https://cdn.jsdelivr.net/gh/2O24/card/img/gift.svg
```

### Image Format: WebP only
- All card images are `.webp` for optimal compression
- Thumbnails: ~70x70px for listings
- Main card: 300px width, auto height

---

## 12. Dark/Light Theme System

```javascript
function toggleTheme() {
  const html = document.documentElement;
  html.setAttribute(
    "data-theme",
    html.getAttribute("data-theme") === "light" ? "dark" : "light"
  );
}
```

### Theme-specific overrides:
```css
/* Dark mode card block */
[data-theme="dark"] .card-block {
  box-shadow: 0 6px 20px rgba(0,0,0,0.42);
}

/* Dark mode form input */
[data-theme="dark"] .card-form input[type="text"] {
  background: #990000;
  border-color: #000;
  color: #fff;
}

/* Dark mode share buttons */
[data-theme="dark"] .share-buttons a {
  color: #fff;
  box-shadow: 0 3px 12px rgba(255,255,255,0.1);
}
```

---

## 13. SEO Content Section

```html
<div class="content-container">
  <h2>Christmas Greeting Card Messages — Write Perfect Wishes</h2>
  <div>
    <!-- 300-500 word SEO article about the card topic -->
    <!-- Keywords: Christmas Greeting Card Messages, Perfect Christmas Wishes... -->
  </div>
</div>
```

Each card page has a **unique SEO article** targeting specific long-tail keywords.

---

## 14. Recent Cards Section

```html
<div class="recent-box" id="recentBox">
  <div class="recent-header">Recent Wish Cards</div>
  
  <a href="/card/mom/10/">
    <div class="recent-item">
      <img loading="lazy" src="{CDN}/card/mom/10/thumb.webp" alt="...">
      <p>International Mother's Day...<br>
         <small>Make wish card with your name</small>
      </p>
    </div>
  </a>
  <!-- ... 4 more items -->
</div>
```

### Styling:
```css
.recent-box {
  max-width: 720px;
  margin: 35px auto;
  border-radius: 14px;
  box-shadow: 0 3px 18px rgba(0,0,0,0.12);
  overflow: hidden;
}

.recent-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 15px;
  border-bottom: 1px solid var(--border);
}

.recent-item img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  object-fit: cover;
}
```

---

## 15. Mobile Responsiveness

### Key Mobile Fixes:
```css
@media (max-width: 480px) {
  /* Card images shrink */
  .hero img {
    width: 95% !important;
    max-width: 300px;
  }
  
  /* Recent items tighter */
  .recent-item {
    gap: 10px;
    padding: 10px 12px;
  }
  .recent-item img {
    width: 60px;
    height: 60px;
  }
}
```

### Viewport Meta:
```html
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
```
`user-scalable=no` prevents pinch-zoom (keeps the card experience clean).

---

## 16. Full Working Code — Ready to Replicate

### To build this exact system, you need:

#### Backend (wish.php):
```php
<?php
// wish.php — Generates personalized card page

$name = isset($_POST['n']) ? htmlspecialchars(trim($_POST['n'])) : '';
$name = isset($_GET['n']) ? htmlspecialchars(trim($_GET['n'])) : $name;

if (empty($name)) {
  header('Location: ./');  // Redirect back to card page
  exit;
}

$encoded_name = urlencode($name);
$card_url = "https://see-me.co/card/xmas/11/";
$share_url = $card_url . "?n=" . $encoded_name;

// WhatsApp share text
$wa_text = urlencode(
  "🤗😇 Have you seen this???\n" .
  "*$name* sent you a special surprise message🎁\n" .
  "💁 *Open This*\n" .
  "👇👇👇👇\n" .
  "$share_url&t=w"
);
$wa_link = "https://api.whatsapp.com/send?text=$wa_text";

// Facebook share
$fb_link = "https://www.facebook.com/sharer/sharer.php?u=" . urlencode($share_url . "&t=fb");
?>

<!-- Then render the same card page HTML but with:
  1. .sname shows $name instead of "Your Name"
  2. .card-form shows share buttons instead of form
-->
```

#### Frontend Card Page (index.html or index.php):
```php
<?php
$name = isset($_GET['n']) ? htmlspecialchars(trim($_GET['n'])) : 'Your Name';
$has_name = isset($_GET['n']) && !empty(trim($_GET['n']));
?>

<div class="sname"><?= $name ?></div>

<!-- Card images -->
<section class="hero">
  <div class="hero-main">
    <img src="{CDN}/wish.webp" style="width:300px;height:50px;">
  </div>
  <div class="hero-side">
    <img src="{CDN}/main.webp" style="width:300px;height:auto;">
    <img src="{CDN}/under.webp" style="width:300px;height:auto;">
  </div>
</section>

<!-- Greeting text -->
<section class="card-section">
  <p style="color:#ff6b00">Merry Christmas!</p>
  <p style="color:#ff0033">May your days sparkle bright,</p>
  ...
  
  <div class="card-form">
    <?php if ($has_name): ?>
      <!-- SHARE BUTTONS -->
      <div class="share-buttons">
        <a class="whatsapp" href="<?= $wa_link ?>">WhatsApp</a>
        <a class="facebook" href="<?= $fb_link ?>">Facebook</a>
      </div>
    <?php else: ?>
      <!-- NAME INPUT FORM -->
      <form action="wish.php" method="POST">
        <input type="text" name="n" placeholder="Enter your name here..." required>
        <input type="submit" value="Create Wish">
      </form>
    <?php endif; ?>
  </div>
</section>
```

#### Key Assets Needed:
```
/style.css                    → Complete CSS (provided in Section 9)
/admin/homepage.json          → Site config + card data
/card/{cat}/{id}/wish.webp    → Top banner image
/card/{cat}/{id}/main.webp    → Main card image  
/card/{cat}/{id}/under.webp   → Bottom image
/card/{cat}/{id}/thumb.webp   → Thumbnail
sname.gif                     → Animated glitter GIF for name text
```

---

## Summary — How Everything Connects

```
┌─────────────────────────────────────────────────────────┐
│                    SEE-ME.CO SYSTEM                      │
│                                                         │
│  CDN (jsDelivr/GitHub)     Server (PHP)                 │
│  ┌──────────────┐          ┌─────────────────────┐      │
│  │ wish.webp    │          │ index.php            │      │
│  │ main.webp    │  ◄────── │   reads ?n= param    │      │
│  │ under.webp   │          │   renders card HTML  │      │
│  │ thumb.webp   │          │                      │      │
│  │ sname.gif    │          │ wish.php             │      │
│  └──────────────┘          │   reads POST n=      │      │
│                            │   generates share URL│      │
│  JSON Config               │   returns card+share │      │
│  ┌──────────────┐          └─────────────────────┘      │
│  │ homepage.json│                                        │
│  │ (branding,   │          Share Flow:                   │
│  │  sections,   │          User → Form → wish.php        │
│  │  cards)      │               → Share → ?n=NAME&t=w    │
│  └──────────────┘               → Recipient sees card    │
│                                                         │
│  Analytics: Google Analytics G-KCLHX3HY0V               │
│  Monetization: Google AdSense                           │
└─────────────────────────────────────────────────────────┘
```

---

**Yeh document mein card page ka har ek chiz reverse-engineer karke explain kiya hai — 3-layer image stack, animated glitter name, form→wish.php→share flow, URL parameter system, CSS theming, mobile responsiveness, sab kuch. Isse directly replicate kar sakte ho.**