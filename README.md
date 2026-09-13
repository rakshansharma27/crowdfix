# CrowdFix

CrowdFix is a voice-first civic issue reporting prototype. It turns natural speech into structured community evidence, merges duplicate reports, and helps local teams prioritize action.

## Run it

Open `index.html` in a browser. For the best microphone experience, serve the folder locally:

```bash
npx serve .
```

The current prototype includes a browser speech-recognition fallback so we can validate the product flow before connecting a Speechmatics backend. The next implementation step is replacing `startListening()` in `app.js` with a secure server-side Speechmatics Realtime connection.

## Onboarding prototype

- New visitors choose Resident or Public-service team and create an account.
- Returning visitors are recognized from local browser storage.
- Location is requested only after the user gives consent, then shown in the header for nearby-report routing.
- This is demo authentication only; the next production step is a real backend with hashed passwords, sessions, role permissions, and a database.
