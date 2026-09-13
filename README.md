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
  - *“Merged because Category (Road Safety), Landmark (Rajpur Road), and Proximity (~140m) matched.”*
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
- **Authentic Account Switcher:** 1-Click switching between verified civic identities (*Rakshan Sharma*, *Ananya Rao*, *Er. Suresh Kumar*, *Priya Nambiar*).

### 6. Production & Open-Source Integrations
- **Web Push Notifications (`sw.js`):** Service Worker-based browser alerts when nearby issues are corroborated or resolved.
- **Authentication:** Clerk Google OAuth button integration.
- **Realtime Sync:** PocketBase integration status indicator.
- **Visual Evidence:** Photo/camera capture placeholder with EXIF GPS sanitization container (*Coming Soon in v2*).

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

CrowdFix includes an automated node test suite verifying all UI components, NLP parsers, clustering algorithms, state logic, and event wiring:

```bash
node test_crowdfix.js
```

**Test Results:**  
```
────────────────────────────────────────────────────────────
RESULTS: 239 passed, 0 failed
🎉 All tests passed! CrowdFix is demo-ready.
────────────────────────────────────────────────────────────
```

---

## 📂 Project Architecture

```
crowdfix-prototype/
├── index.html          # Semantic HTML5 single-page application shell & modals
├── styles.css          # Modern responsive CSS (Space Grotesk + DM Sans, glassmorphism)
├── app.js              # Speechmatics telemetry, Civic Parser, Clustering Engine & Automation
├── sw.js               # Service worker for offline caching & Web Push notifications
├── test_crowdfix.js    # Comprehensive test runner (239 tests covering all logic)
└── README.md           # Documentation, architecture & presentation guide
```

---

## 🏆 Hackathon Pitch Highlights

1. **Speechmatics-First:** Voice isn't just an input method — it is the bridge that empowers non-technical citizens and two-wheeler commuters to report problems in seconds.
2. **Explainability Over Black Boxes:** Both citizens and municipal officers see *why* issues are merged and *how* priority scores are computed.
3. **Closing the Loop:** Transparent public accountability transforms passive complaining into collective civic action.
