# CrowdFix — Turn Voices into Action

CrowdFix is a voice-first civic operations platform that transforms community complaints into structured, explainable, and actionable civic evidence.

Residents report problems naturally by voice. CrowdFix transcribes the report, extracts civic information, detects duplicate complaints, groups them into issue clusters, and helps public-service teams track resolution.

🌐 **Live Demo:** [https://rakshansharma27.github.io/crowdfix/](https://rakshansharma27.github.io/crowdfix/)  
📍 **Demonstration Deployment Zone:** Dehradun, Uttarakhand, India

---

## Problem

Civic complaints are often fragmented across phone calls, messages, social media, and municipal portals. Many residents report the same problem separately, making it difficult for public-service teams to identify the most urgent issues.

CrowdFix combines these fragmented voices into one clear community evidence graph.

---

## How it works

```
Resident voice report
       ↓
Speechmatics realtime transcription
       ↓
Civic Evidence Parser
       ↓
Duplicate detection and issue clustering
       ↓
Interactive privacy-preserving map
       ↓
Public-service officer action
       ↓
Resolution tracking
```

---

## Prototype vs. Production

To maintain total transparency for hackathon evaluation, the table below clarifies what is live and functional in the prototype versus what is simulated for demonstration reliability:

| Capability | Status in Prototype | Production Architecture |
|---|---|---|
| **Voice Capture & Engine** | **Live WebSocket Client & Demo Mode** (`wss://eu2.rt.speechmatics.com/v2` with `enhanced` & `standard` models; auto-fallback to Web Speech API / 1-Tap prompts) | Server-side WebSocket proxy with enterprise JWT generation |
| **Speechmatics Telemetry** | **Live Streaming** (Realtime partial transcripts, ~175ms latency telemetry, confidence progression, and Indian English / Hinglish language identification) | Production Speechmatics Realtime Telemetry feed |
| **Civic Evidence Parser** | **Live** (Rule-based NLP heuristic engine for category, landmark, severity, spam) | Expanded LLM / NLP civic entity extractor |
| **Duplicate Clustering** | **Live** (Explainable matcher grouping reports by category, landmark & proximity) | Spatial DB clustering (PostGIS / Vector embeddings) |
| **Interactive Map & Heatmap** | **Live** (Leaflet.js + OpenStreetMap tiles + density heatmap layer) | Scaled vector tile server + municipal GIS overlays |
| **Reverse Geocoding** | **Client-side with fallback** (Nominatim OpenStreetMap lookup + neighborhood anchor) | Enterprise geocoding service with street-level routing |
| **Resident & Officer Workflows** | **Live** (Filing, +1 corroboration, status lifecycle: Open → In Progress → Resolved) | Enterprise role-based access control (RBAC) |
| **Civic Activity Engine** | **Demo simulation** (Periodic citizen reports & municipal resolutions) | Real resident traffic + municipal dispatch feeds |
| **Authentication** | **Demo personas** (1-Click switcher; no passwords required) | Planned integration: Clerk / Google OAuth / Aadhaar |
| **Push Notifications** | **Demo simulation** (Service Worker `sw.js` registration) | Web Push via VAPID / FCM + SMS / WhatsApp webhooks |
| **Data Persistence** | **Live** (Browser `localStorage` with Reset Demo Data) | Planned integration: PocketBase / PostgreSQL database |

> **Note on Telemetry & Zero-Risk Fallback:** The prototype features a direct browser client for the official Speechmatics Realtime WebSocket API (`wss://eu2.rt.speechmatics.com/v2`). Judges and evaluators can optionally enter an API key to stream live microphone audio through the **Enhanced** model, or use the zero-setup instant demo mode and 1-tap prompts so presentations never fail due to API limits or microphone permissions.

---

## Key Features

- **Real-time voice report intake**
- **Speechmatics transcription telemetry:** Demonstrates interim transcripts, confidence progression, latency tracking, and language detection.
- **English and Hinglish demo prompts:** Ready-made test chips tailored for Indian bilingual code-switching.
- **Civic category extraction:** Classifies issues into *Road Safety*, *Cleanliness*, *Public Lighting*, *Water & Sewage*, and *Traffic & Transit*.
- **Landmark and severity detection:** Identifies municipal landmarks and estimates urgency level.
- **Explainable duplicate clustering:** Transparently highlights *why* complaints are merged into existing clusters.
- **Community pressure scoring:** Dynamically calculates urgency as corroborating voices accumulate.
- **Interactive Leaflet and OpenStreetMap map:** Visualizes civic clusters with discrete pins and continuous density heatmap.
- **Approximate location handling for privacy:** Protects resident privacy by snapping to neighborhood-level landmarks.
- **Resident and public-service team workflows:** Full lifecycle management from first report to municipal sign-off.
- **Add My Voice corroboration:** Allows neighbors to back an existing complaint with a single click.
- **Issue status lifecycle:**
  - `Open` — Awaiting municipal review
  - `In Progress` — Dispatched to field crew
  - `Resolved` — Work verified and completed
- **Live Reports feed with search and filters**
- **Issue Cluster dashboard & priority queue**
- **Resolved issue archive & accountability log**
- **WhatsApp sharing & evidence export demo**
- **LocalStorage persistence & Reset Demo Data functionality**
- **Mobile-responsive glassmorphic interface**

---

## Speechmatics Integration

Speechmatics powers the voice-first experience through an official Realtime WebSocket client (`wss://eu2.rt.speechmatics.com/v2`):
- **Realtime WebSocket Protocol:** Connects with `StartRecognition` handshake, 16kHz PCM raw audio streaming, and receives live `AddPartialTranscript`, `AddTranscript`, and `EndOfTranscript` events.
- **Model Selection via Single Config:**
  - **Enhanced (Default):** Highest accuracy for real-time civic testimony and street names (`operating_point: "enhanced"`).
  - **Standard:** Fastest turnaround and lowest latency when throughput is paramount.
  - **Melia 1 (Roadmap / Preview):** Built for automatic multilingual code-switching mid-conversation.
- **Multilingual Code-Switching:** Specifically tuned for Indian English and colloquial **Hinglish** (e.g., *"Rajpur Road Clock Tower ke paas bohot bada gaddha hai"*).
- **Streaming Telemetry HUD:** Displays live confidence scores (98%+), ~175ms latency jitter, language detection badge, and partial words.
- **Judge-Proof Fallback:** If an API key is provided in **⚙ API Settings**, it streams live audio via the Speechmatics WebSocket; otherwise, it seamlessly runs with browser Web Speech and 1-tap prompts so presentations never fail.

After transcription, CrowdFix processes the text through its Civic Evidence Parser and clustering engine.

---

## Civic Evidence Parser

The parser extracts structured data from natural spoken statements:
- Civic category
- Landmark or street
- Severity & urgency
- Hazard risk
- Spam risk assessment
- Duplicate clustering prediction

**Example Extracted Output:**
```json
{
  "category": "ROAD SAFETY",
  "landmark": "Rajpur Road",
  "severity": "High",
  "hazard": "Vehicle accident risk",
  "spamRisk": "Low"
}
```

The parser is intentionally structured as a transparent, rule-based civic evidence engine rather than an unexplainable black-box model.

---

## Explainable Clustering

CrowdFix explains exactly why incoming complaints are merged:
- ✓ **Category matched:** Road Safety
- ✓ **Landmark matched:** Rajpur Road / Clock Tower junction
- ✓ **Location proximity matched:** ~120m–180m
- ✓ **Corroborated evidence:** Hazard confirmed across multiple independent testimonies

This allows both residents and municipal officers to understand how community evidence is grouped without guessing.

---

## Demo Personas

The prototype includes an instant persona switcher to test both citizen and municipal officer perspectives:

| Persona | Role | Assigned Department / Area |
|---|---|---|
| **Rakshan Sharma** | Resident | Rajpur Road, Dehradun |
| **Arav Sharma** | Resident | Ballupur Chowk, Dehradun |
| **Snehal Raj** | Public-Service Officer | Nagar Nigam Dehradun (Civic Works & SWM) |

> **Note:** These are demo personas; no real credentials are required. Judges can switch personas instantly using the **Account Switcher** in the topbar or modal. Guests can also browse the live map, clusters, and feed freely without logging in.

---

## Real-Time Civic Activity Simulator

To demonstrate how the platform performs under real-world municipal volume, a continuous background simulation engine periodically introduces citizen complaints and municipal resolutions across Dehradun corridors (*Clock Tower, Paltan Bazaar, Ballupur Chowk, Saharanpur Road, Prem Nagar*).

- **Simulated activity:** Occurs at randomized intervals (every 8–15 seconds), which explains why live dashboard counts and testimonies grow dynamically during an extended viewing session.
- **Seed Protection:** Core demo baselines (*issue-1*, *issue-2*, *issue-3*) are permanently protected from automated resolution so judges can run merge tests at any time.
- **Resetting for presentations:** The activity simulator can be reset before a presentation using the **Reset Demo Data** button in the topbar or sidebar.

---

## Demo Walkthrough

1. Open the [CrowdFix Live Demo](https://rakshansharma27.github.io/crowdfix/).
2. Click **Quick Voice Demo** (or press `R` on your keyboard).
3. Select a demo prompt such as:
   - `English: Pothole Rajpur Rd (Merge Test)`
   - `Hinglish: Pothole Rajpur Road (Merge Test)`
   - `English: Overflowing Bins Paltan Bazaar (Merge Test)`
   - `English: Water Pipeline Burst (New Cluster)`
4. Watch the Speechmatics transcription HUD stream words and telemetry live.
5. Review the Civic Evidence Parser prediction (`Will merge into existing cluster`).
6. Click **Process & Submit Report**.
7. Open the issue cluster to inspect testimonies, pressure scores, and clustering criteria.
8. Add another community voice using **+1 Add My Voice**.
9. Switch to **Public-Service Team** mode (Snehal Raj).
10. Update the issue status to **In Progress** or **Resolved** with an official action note.
11. View the archived issue in the **Resolved** section.

---

## Privacy and Safety

- **Privacy-preserving coordinates:** Exact citizen GPS coordinates are never stored or publicly displayed; reports are snapped to approximate neighborhood landmarks.
- **Verification thresholds:** Single-source reports are labeled as `Needs Verification` until corroborating community voices join.
- **Safe authentication:** The prototype does not expose, collect, or store private personal credentials.
- **Spam prevention:** Built-in heuristic filters flag gibberish, repetition, and micro-inputs.

---

## Technology

- **Frontend:** HTML5, CSS3 (Modern Glassmorphic Design System), Vanilla JavaScript (ES6+)
- **Speech Recognition:** Speechmatics realtime streaming concept + Web Speech API fallback
- **Mapping:** Leaflet.js, OpenStreetMap tiles, Leaflet-heat plugin
- **Geocoding:** Nominatim reverse geocoding with local fallback
- **Client Storage:** Browser `localStorage` with self-healing seed integrity
- **Hosting:** GitHub Pages

---

## Run Locally

Clone the repository:
```bash
git clone https://github.com/rakshansharma27/crowdfix.git
cd crowdfix
```

Start a local web server:
```bash
# Using Python
python -m http.server 4173

# Or using Node.js
npx serve . --listen 4173
```

Open in your browser:
```
http://localhost:4173
```

> **Tip:** Microphone access and geolocation operate best on `localhost` or over secure HTTPS connections.

---

## Automated Test Suite

CrowdFix includes a comprehensive Node.js automated test suite covering HTML structure, CSS classes, speech recognition wiring, NLP parsing, duplicate clustering, state integrity, and role guards:

```bash
node test_crowdfix.js
```

**Latest Test Results (September 13, 2026):**
```
────────────────────────────────────────────────────────────
RESULTS: 269 passed, 0 failed
🎉 All tests passed! CrowdFix is demo-ready.
────────────────────────────────────────────────────────────
```

### Verified Test Areas
- **Official Speechmatics WebSocket Engine:** Handshake, `StartRecognition`, `operating_point: "enhanced"`, 16kHz PCM downsampling, model switching (`Enhanced`, `Standard`, `Melia 1`), and settings modal
- **HTML Structure & Critical IDs:** View containers, modals, feeds, telemetry HUDs
- **Civic Evidence Parser:** 12 English & Hinglish parsing edge cases
- **Dehradun Duplicate Clustering Matcher:** Landmark aliasing, corridor matching, partial stream corroboration
- **Seed Baseline Protection:** Exemption of seed issues from background resolution
- **State Integrity & Self-Healing:** LocalStorage migration and restoration
- **UI & Accessibility:** CSS glassmorphism, responsive breakpoints, keyboard shortcuts

---

## Project Structure

```
crowdfix/
├── index.html          # Semantic HTML5 SPA shell (hero HUD, map, priority queue, modals)
├── styles.css          # Modern Design System (glassmorphism, scroll animations, responsive layout)
├── app.js              # Civic Evidence Parser, Clustering Matcher, Speechmatics Client & State
├── config.example.js   # Template for Speechmatics API key & model settings
├── sw.js               # Service Worker for demo push notifications & offline caching
├── test_crowdfix.js    # Comprehensive automated test runner (269 tests)
└── README.md           # Architecture, presentation guide & documentation
```

---

## Prototype Limitations & Future Roadmap

This hackathon prototype demonstrates client-side civic operations. Production rollout will incorporate:

- **Municipal Ticketing Integration:** Direct bidirectional sync with municipal ERPs and CM Helpline APIs.
- **Multilingual Telephony Reporting:** IVR / SIP phone-call reporting powered by Speechmatics for non-smartphone users.
- **Regional Languages:** Expansion to Hindi, Kannada, Tamil, Telugu, and other regional Indian dialects.
- **Photo Evidence Verification:** Camera capture with server-side EXIF GPS verification and automated privacy blurring.
- **Enterprise Authentication:** Production OAuth 2.0 with government Single Sign-On (SSO).
- **Automated Routing:** Machine learning-driven dispatch directly to jurisdictional ward engineers.

---

## Project Vision

CrowdFix turns fragmented community voices into organized civic evidence—and turns civic evidence into action.

---

## Credits

Built for the Speechmatics hackathon challenge.

Powered by:
- [Speechmatics](https://www.speechmatics.com/)
- [Leaflet](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)
