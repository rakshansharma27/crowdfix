# CrowdFix — Voice-First Civic Issue Intelligence

> **Turn fragmented citizen voices into collective civic evidence — and collective evidence into municipal action.**

🌐 **Live GitHub Pages Demo:** [https://rakshansharma27.github.io/crowdfix/](https://rakshansharma27.github.io/crowdfix/)  
📍 **Demonstration Deployment Zone:** Dehradun, Uttarakhand, India (Nagar Nigam Dehradun / MDDA)

---

## 🎯 The Problem

When citizens face broken streetlights, hazardous potholes, bursting sewer mains, or overflowing trash dumps, reporting is tedious and disjointed:
- **Low citizen engagement:** Typing formal complaints into complex municipal portals on mobile keyboards is friction-heavy.
- **Fragmented complaints:** 25 different residents report the same crater on a busy road as 25 distinct tickets, overwhelming municipal dispatch queues.
- **No civic feedback loop:** Citizens feel reports enter a "black hole" with zero transparency into corroboration or work progress.

---

## 💡 The Solution: How CrowdFix Works

CrowdFix is a **voice-first civic intelligence engine** that transforms spoken community complaints into actionable, grouped civic evidence with transparent explainability:

```
[ Citizen Speaks (English / Hinglish) ]
                 │
                 ▼
[ Speechmatics Realtime ASR Layer ] ── (~180ms telemetry, streaming confidence)
                 │
                 ▼
[ Civic Evidence Parser (NLP/Heuristics) ] ── (Category, Landmark, Severity, Spam Filter)
                 │
                 ▼
[ Explainable Duplicate Clustering Engine ] ── (Matches category + proximity + landmark)
        ┌────────┴────────┐
        ▼                 ▼
[ Corroborates Cluster ] [ Creates New Cluster ] ── (Leaflet.js & Density Heatmap)
        │
        ▼
[ Real-Time Automated Civic Simulation ] ── (Dynamic citizen voices & Nagar Nigam resolutions)
```

---

## 🚀 Key Features

### 1. Speechmatics Realtime Voice Understanding (English & Hinglish)
- Built for real Indian speech: understands standard English and code-mixed colloquial **Hinglish** (e.g., *"Rajpur Road Clock Tower ke paas bohot bada gaddha hai"*).
- **Streaming Telemetry HUD:** Displays live confidence scores (98%+), ~180ms latency jitter, live language badge, and interim partial speech transcripts.
- **1-Tap Demo Test Prompts:** Fast test chips in both English & Hinglish for instant live presentation demos.

### 2. Explainable Duplicate Clustering Engine
- Automatically aggregates multiple citizen voices reporting the same underlying civic problem into a single high-priority cluster.
- Transparently displays **explainable criteria** to judges and public officers:
  - *"Merged because Category (Road Safety), Landmark (Rajpur Road), and Proximity (~140m) matched."*
- Prevents civic ticket bloat while boosting urgent community pressure scores.

### 3. OpenStreetMap + Nominatim Reverse Geocoding & Leaflet Heatmap
- Automatic reverse geocoding via OpenStreetMap Nominatim with privacy-preserving neighborhood obfuscation (exact citizen GPS is never exposed).
- **FOSS Density Heatmap (`leaflet-heat`):** 1-Click toggle between discrete civic pins and continuous complaint density heatmaps.

### 4. Continuous Randomized Civic Activity & Resolution Engine
- **Automated Citizen Voices:** Continuously simulates realistic citizen complaints across major Dehradun corridors (*Prem Nagar, Clock Tower, Paltan Bazaar, Ballupur Chowk, ISBT Dehradun, Saharanpur Road, EC Road*) at randomized intervals (8–15 seconds).
- **Automated Municipal Resolutions:** Simulates municipal teams (*Er. Suresh Kumar - Roads*, *Priya Nambiar - SWM*, *UPCL Electrical*, *Uttarakhand Jal Sansthan*) inspecting, updating status, resolving issues, and archiving tickets into the **Civic Accountability Log**.

### 5. Multi-Persona Experience (Resident vs. Officer)
- **Resident Mode:** File spoken reports, corroborate ongoing clusters (`+1 Add My Voice`), share evidence to WhatsApp, or export PDF dossiers.
- **Public-Service Team Mode (Nagar Nigam Dehradun):** Review citizen audio transcripts, inspect clustering criteria, update status (`Open` → `In Progress` → `Resolved`), and log verified repair notes.
- **Authentic Account Switcher:** 1-Click switching between verified civic identities (*Rakshan Sharma*, *Arav Sharma*, *Snehal Raj*).

### 6. Guest Browsing & Auth Access Control
- **Anyone can browse** the live map, issue clusters, reports feed, and resolved archive without creating an account.
- **Protected actions require login:** Filing a report, corroborating an issue (`+1`), and officer status updates are all auth-gated.
- Auth modal opens automatically when a guest attempts a protected action, with a contextual subtitle explaining why login is needed.
- Auth form inputs are blank by default — no autofill or hardcoded identity.

### 7. Modern UI / UX Design System (v2.0)
- **Glassmorphic sticky topbar:** `backdrop-filter: blur(20px)` frosted glass header pinned to the top while scrolling.
- **Scroll reveal animations:** `IntersectionObserver`-powered entrance animations — cards, stat blocks, and feed items fade and slide in as they enter the viewport, with stagger delays for sequential reveal.
- **Micro-interactions everywhere:** Button shimmer sweep on hover, icon spin on stat cards, sidebar nav slide-in, issue row slide-right, cluster card lift with gradient overlay reveal, close button rotate-on-hover.
- **Floating hero orbit:** Animated floating nodes with staggered `float` keyframes.
- **Gradient design language:** Linear gradient buttons, gradient top-border reveal on card hover, gradient pressure bar fill (`purple → orange`), gradient hero background with ambient radial glow layers.
- **Glassmorphic modals:** `backdrop-filter: blur(10px)` overlay, `modalIn` scale+translateY entrance animation, rounded `28px` corners.
- **Custom scrollbar:** 5px thin scrollbar with rounded thumb matching the design system.
- **Full responsiveness:** Breakpoints at 1100px, 960px (mobile nav), 640px (single-column), 400px (micro screens).

### 8. Production & Open-Source Integrations
- **Web Push Notifications (`sw.js`):** Service Worker-based browser alerts when nearby issues are corroborated or resolved.
- **Authentication:** Clerk Google OAuth button integration.
- **Realtime Sync:** PocketBase integration status indicator.
- **Visual Evidence:** Photo/camera capture placeholder with EXIF GPS sanitization container (*Coming Soon in v2*).

---

## 👥 Demo Accounts

| Name | Role | Email | Area |
|------|------|-------|------|
| Rakshan Sharma | Resident | rakshan.sharma@gmail.com | Rajpur Road, Dehradun |
| Arav Sharma | Resident | arav.sharma@outlook.com | Ballupur Chowk, Dehradun |
| Snehal Raj | Officer (Nagar Nigam) | snehal.raj@nagarnigamdehradun.gov.in | Civic Works & SWM |

> Log in with any of the above accounts via the **Sign In** button. Guests can browse the full map and reports feed without logging in.

---

## 🏛️ Grounded Demonstration Zone: Dehradun, Uttarakhand

The prototype is fully configured for Dehradun civic operations:
- **Default Map Center:** Dehradun Ghanta Ghar / Clock Tower (`[30.3256, 78.0437]`).
- **Civic Bodies:** Nagar Nigam Dehradun (DMC), Mussoorie Dehradun Development Authority (MDDA), Uttarakhand Jal Sansthan, and UPCL.
- **Landmarks Recognized:** Rajpur Road, Clock Tower, Paltan Bazaar, Ballupur Chowk, Saharanpur Road, Prem Nagar (College Corridor), ISBT Dehradun.

---

## 💻 Local Quickstart

Run with any zero-configuration static server (pure HTML5 / ES6 / CSS3):

```bash
# Clone the repository
git clone https://github.com/rakshansharma27/crowdfix.git
cd crowdfix

# Run local web server
npx serve . --listen 3434
```

Open `http://localhost:3434` in Google Chrome or Microsoft Edge for microphone access via Web Speech API.

---

## 🧪 Automated Testing & Verification

CrowdFix includes an automated Node.js test suite verifying all UI components, NLP parsers, clustering algorithms, state logic, event wiring, auth guards, and guest browsing controls:

```bash
node test_crowdfix.js
```

**Test Results:**  
```
────────────────────────────────────────────────────────────
RESULTS: 253 passed, 0 failed
🎉 All tests passed! CrowdFix is demo-ready.
────────────────────────────────────────────────────────────
```

### Test Coverage Areas
| Suite | Tests |
|-------|-------|
| HTML Structure & Accessibility | IDs, ARIA, semantic elements |
| CSS Critical Classes | All component classes present |
| Speechmatics HUD & Language | Streaming, confidence, Hinglish, Hero HUD |
| Civic Evidence Parser | 12 English & Hinglish scenarios |
| Explainable Clustering Logic | 6 merge/create scenarios |
| Stats & State Logic | Formulas, edge cases |
| P2: Pressure Score | 6 voice-count scenarios |
| P2: Resolution Estimate | 4 scenarios + render check |
| P2: SLA Countdown | Recent/breached/cleared |
| P2: WhatsApp Share | URL, tab, content |
| Keyboard Shortcuts | R key, Escape, input guards |
| Mobile Navigation | Hamburger, overlay, slide-in |
| Share & Export | `navigator.share`, PDF toast |
| Empty States | All 4 views |
| Dynamic Timestamps | `timeAgo`, auto-refresh |
| Seed Data Integrity | 3 issues, Dehradun testimonies & landmarks |
| Realism (Maps, Auth, Photos) | Nominatim, Clerk, PocketBase, heatmap |
| Guest Browsing & Auth Guards | 11 access-control & demo guest scenarios |

---

## 📂 Project Architecture

```
crowdfix-prototype/
├── index.html          # Semantic HTML5 SPA shell — guest/auth state, hero HUD, modals, scroll-reveal classes
├── styles.css          # Modern Design System v2.0 — glassmorphism, scroll animations, micro-interactions
├── app.js              # Speechmatics telemetry, Civic Parser, Clustering, Auth, Automation, Scroll Reveal
├── sw.js               # Service worker for offline caching & Web Push notifications
├── test_crowdfix.js    # Comprehensive test runner (250 tests covering all logic & UI)
└── README.md           # Documentation, architecture & presentation guide
```

---

## 🏆 Hackathon Pitch Highlights

1. **Speechmatics-First:** Voice isn't just an input method — it is the bridge that empowers non-technical citizens and two-wheeler commuters to report problems in seconds.
2. **Explainability Over Black Boxes:** Both citizens and municipal officers see *why* issues are merged and *how* priority scores are computed.
3. **Closing the Loop:** Transparent public accountability transforms passive complaining into collective civic action.
4. **Open by Default:** Anyone can browse the live civic map and evidence feed without an account — lowering the barrier to public engagement.
5. **Modern & Accessible:** A production-grade UI/UX with glassmorphism, scroll animations, full responsiveness, and keyboard navigation support.

---

*Built with ❤️ for Dehradun · Powered by Speechmatics, Leaflet, OpenStreetMap & open web standards*
