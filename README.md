# CrowdFix — Turn Voices into Action

CrowdFix is a voice-first civic operations platform that transforms community complaints into structured, explainable, and actionable civic evidence.

Residents report problems naturally by voice. CrowdFix transcribes the report, extracts civic information, detects duplicate complaints, groups them into issue clusters, and helps public-service teams track resolution.

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

## Key Features

- **Real-time voice report intake**
- **Speechmatics transcription telemetry**
- **Interim transcript and confidence display**
- **English and Hinglish demo prompts**
- **Civic category extraction**
- **Landmark and severity detection**
- **Explainable duplicate clustering**
- **Community pressure scoring**
- **Interactive Leaflet and OpenStreetMap map**
- **Approximate location handling for privacy**
- **Resident and public-service team workflows**
- **Add My Voice corroboration**
- **Issue status lifecycle:**
  - `Open`
  - `In Progress`
  - `Resolved`
- **Live Reports feed with search and filters**
- **Issue Cluster dashboard**
- **Resolved issue archive**
- **WhatsApp sharing**
- **Evidence export demo**
- **LocalStorage persistence**
- **Reset Demo Data functionality**
- **Mobile-responsive interface**

---

## Speechmatics Integration

Speechmatics powers the realtime speech experience, including:
- Interim transcription
- Final transcript confirmation
- Confidence scores
- Language display
- Latency telemetry
- English and Hinglish voice input

After transcription, CrowdFix processes the text through its Civic Evidence Parser and clustering engine.

The prototype also includes demo prompts and browser recognition fallbacks so judges can test the complete workflow even when microphone access or external API access is unavailable.

---

## Civic Evidence Parser

The parser extracts:
- Civic category
- Landmark or street
- Severity
- Hazard level
- Spam risk
- Possible duplicate cluster

**Example:**
```json
{
  "category": "ROAD SAFETY",
  "landmark": "Rajpur Road",
  "severity": "High",
  "hazard": "Vehicle accident risk",
  "spamRisk": "Low"
}
```

The parser is intentionally presented as a transparent rule-based civic evidence engine rather than an unexplained black-box AI system.

---

## Explainable Clustering

CrowdFix explains why reports are merged:
- ✓ Category matched: Road Safety
- ✓ Landmark matched: Rajpur Road
- ✓ Location proximity matched
- ✓ Existing community cluster found

This allows both residents and officers to understand how community evidence is organized.

---

## Demo Walkthrough

1. Open the [CrowdFix Live Demo](https://rakshansharma27.github.io/crowdfix/).
2. Click **Quick Voice Demo**.
3. Select a demo prompt such as:
   - *Pothole near Rajpur Road*
   - *Overflowing bins at Paltan Bazaar*
   - *Water pipeline burst*
4. Watch the Speechmatics transcription HUD.
5. Review the Civic Evidence Parser output.
6. Submit the report.
7. Open the issue cluster and inspect the evidence.
8. Add another community voice using **Add My Voice**.
9. Switch to **Public-Service Team** mode.
10. Change the issue to **In Progress** or **Resolved**.
11. View the updated issue in the **Resolved** archive.

---

## Privacy and Safety

- Exact resident GPS coordinates are not publicly displayed.
- Locations are obfuscated to an approximate neighborhood level.
- Single reports are marked as requiring verification.
- High-priority escalation requires additional corroboration or officer confirmation.
- The prototype does not expose private account credentials.
- Demo authentication is local-only and intended for hackathon testing.

---

## Technology

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **Speechmatics speech-to-text**
- **Leaflet.js**
- **OpenStreetMap tiles**
- **Browser Geolocation API**
- **Browser Web Speech API fallback**
- **LocalStorage persistence**
- **GitHub Pages deployment**

---

## Run Locally

Clone the repository:
```bash
git clone https://github.com/rakshansharma27/crowdfix.git
cd crowdfix
```

Start a local server:
```bash
python -m http.server 4173
```

Open:
```
http://localhost:4173
```

> **Note:** Microphone and geolocation features work best on `localhost` or HTTPS.

---

## Project Structure

```
crowdfix/
├── index.html
├── styles.css
├── app.js
└── README.md
```

---

## Current Prototype Limitations

This hackathon prototype uses local browser state for demonstration purposes.

Production deployment would require:
- Secure backend authentication
- Hashed password storage
- Role-based authorization
- Persistent database storage
- Secure Speechmatics server integration
- Municipal ticketing API integration
- Officer notification webhooks
- Production-grade moderation and abuse prevention

---

## Future Roadmap

- Integration with municipal ticketing systems
- Kannada, Hindi, and additional regional-language support
- Phone-call reporting through Twilio or SIP
- Photo evidence with EXIF location sanitization
- Secure resident and officer accounts
- Push notifications for issue updates
- Automatic dispatch to the correct civic department
- Historical civic analytics and response-time reporting

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
